"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Modal, Button, Table, Overlay, Popover } from 'react-bootstrap'
import BundleListCard from './BundleListCard'
import { useProductList } from '@/services/productServices'
import { useQueryClient } from '@tanstack/react-query'
import DataTable from 'react-data-table-component';
import { customTableStyles, debounce, detectDarkMode } from '@/utils/other';
import IconifyIcon from '@/components/wrappers/IconifyIcon'



const BundleOptions = ({ bundles, setBundles, onSubmit, manageBundleOptions, bundleId, useApi = false }) => {
  const [tempSelectedProducts, setTempSelectedProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [showFilters, setShowFilters] = useState(false);
  const [selectedBundleIndex, setSelectedBundleIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // const target = useRef(null)
  const queryClient = useQueryClient();
  const { data: productList } = useProductList({ pageSize: perPage, pageNumber: page, searchTerm , filterStatus: 1})




  useEffect(() => {
    const mode = detectDarkMode(setIsDarkMode)
    setIsDarkMode(mode)
  }, [])



  useEffect(() => {
    queryClient.invalidateQueries(['productList']);
  }, []);

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 600);

  const handleOpenModal = (index) => {
    setSelectedBundleIndex(index);
    const products = bundles[index]?.products || [];

    const normalized = products.map(p => ({
      ...p,
      productId: p.productId || p.id,
      id: p.productId || p.id,
      quantity: p.quantity || 1,
      isActive: p.isActive ?? true,
    }));

    setTempSelectedProducts(normalized);
    setShowModal(true);
  };

  const handleSelectProduct = (product) => {
    const key = getProductKey(product);

    setTempSelectedProducts((prev) => {
      const exists = prev.find((p) => getProductKey(p) === key);

      if (useApi) {

        if (exists) {

          return prev.map((p) =>
            getProductKey(p) === key
              ? { ...p, isDeletedProduct: !p.isDeletedProduct }
              : p
          );
        }

        return [
          ...prev,
          {
            ...product,
            productId: product.id,
            quantity: product.quantity || 1,
            isActive: product.isActive ?? true,
            isDeletedProduct: false,
          },
        ];
      }


      if (exists) {

        return prev.filter((p) => getProductKey(p) !== key);
      }

      return [
        ...prev,
        {
          ...product,
          productId: product.id,
          quantity: product.quantity || 1,
          isActive: product.isActive ?? true,
        },
      ];
    });
  };



  const handleAddBundle = () => {
    setBundles(prev => [...prev, { name: '', products: [] }]);
  };
  const handleAddToBundle = () => {


    setBundles(prev => {
      const updated = [...prev];
      updated[selectedBundleIndex].products = tempSelectedProducts;
      return updated;
    });



    setShowModal(false);
    setSelectedBundleIndex(null);

  }
  const handleNameChange = (index, value) => {
    const newName = value;
    setBundles(prev => {
      const updated = [...prev];
      updated[index].name = newName;
      return updated;
    })
  }
  const handleQuantityChange = (bundleIndex, productId, quantity) => {
    setBundles(prev => {
      const updated = [...prev];
      updated[bundleIndex].products = updated[bundleIndex].products.map(product => {
        if (product.id === productId) {
          return { ...product, quantity };
        }
        return product;
      });
      return updated;
    });
  };
  const handleSwitchChange = (bundleIndex, productId, checked) => {
    setBundles(prev => {
      const updated = [...prev];
      updated[bundleIndex].products = updated[bundleIndex].products.map(product => {
        if (product.id === productId) {
          return { ...product, isActive: checked };
        }
        return product;
      });
      return updated;
    });
  }
  const handleDeleteBundle = (nameToDelete) => {

    const bundleData = {
      productBundleId: bundleId,
      actionType: "remove",
      bundleItemProducts: bundles.map(bundle => ({
        itemTitle: bundle.name || "Untitled",
        isDeletedItem: bundle.name === nameToDelete,
        bundleItemProductsWithStatus: bundle.products.map(product => ({
          id: product.id || null,
          productId: product?.productId || null,
          variantId: product?.variantId || null,
          quantity: Number(product.quantity) || 1,
          activeStatus: product.isActive,
          isDeletedProduct: false
        }))
      }))
    };


    if (useApi) {
      manageBundleOptions(bundleData);
    }
    setBundles(prev => prev.filter(bundle => bundle.name !== nameToDelete));
  };

  const getProductKey = (p) =>
    p && p.variantId ? String(p.variantId) : String(p.id);

  const columns = [
    {
      name: 'Product Image',
      selector: (row) => row.category,
      cell: (row) => (
        <div className="d-flex align-items-center p-2">
          <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
            {Array.isArray(row.productVariants) && (
              <img
                src={row.defaultImageUrl[0] || 'https://shorturl.at/MAEWU'}
                alt={`category${row.id}`}
                className="avatar-md"
                 onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://shorturl.at/MAEWU'
                }}
              />
            )}
          </div>
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Product Name',
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: 'Product Category',
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: 'Select',

      cell: (row) => {
        const rowKey = getProductKey(row);
        return (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`flexSwitch-${rowKey}`}
              onChange={() => handleSelectProduct(row)}
              checked={
                tempSelectedProducts.some(
                  (p) => getProductKey(p) === rowKey && !p.isDeletedProduct
                )
              }
            />
          </div>
        );
      },
    },
  ]


  return (
    <>
      <Col md={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <CardTitle as={'h4'}>Bundle Options</CardTitle>
            <button type='button' className="btn btn-primary d-flex align-items-center gap-1" onClick={handleAddBundle}>
              <IconifyIcon icon="bx:bx-plus" /><div>Add Option</div>
            </button>
          </CardHeader>

          <CardBody className="d-flex flex-column gap-4">
            {bundles.map((bundle, index) => (
              <BundleListCard
                key={`bundle-${index}`}
                index={index}
                name={bundle.name}
                products={bundle.products}
                onNameChange={(name) => { handleNameChange(index, name) }}
                onQuantityChange={(productId, quantity) => {
                  handleQuantityChange(index, productId, quantity)
                }}
                onSwitchChange={(productId, checked) => {
                  handleSwitchChange(index, productId, checked)
                }}
                onOpenModal={() => handleOpenModal(index)}
                onDeleteBundle={(name) => handleDeleteBundle(name)}
              />
            ))}
          </CardBody>

          <CardFooter className="border-top d-flex justify-content-end">
            <button type='submit' className="btn btn-primary" onClick={onSubmit}>
              {useApi ? "Update Product Bundle" : "Create Product Bundle"}
            </button >
          </CardFooter>
        </Card>
      </Col>
      {selectedBundleIndex !== null && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered scrollable>
          <Modal.Header className="d-flex align-items-center justify-content-between">
            <Modal.Title>Select Products for Bundle #{selectedBundleIndex + 1}</Modal.Title>
            <div className=" d-flex justify-content-end position-relative">

              <div>
                <label className="form-label mb-1">Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Product"
                  onClick={(e) => e.stopPropagation()}
                  // value={searchTerm}
                  onChange={(e) => debouncedSearch(e.target.value)}
                />
              </div>

              {/* <button
                className="btn btn-outline-primary d-flex align-items-center gap-1"
                ref={target}
                onClick={() => setShowFilters(!showFilters)}
                type='button'
              >
                <IconifyIcon icon="tabler:filter" className="fs-5" />
              </button>

              <Overlay
                container={document.body}
                target={target.current}
                show={showFilters}
                placement="bottom-end"
                rootClose
                onHide={() => setShowFilters(false)}>
                <Popover id="filter-popover" className="shadow-sm border-0"  onClick={(e) => e.stopPropagation()}>
                  <Popover.Body onClick={(e) => e.stopPropagation()}>
                    <div className="d-flex flex-column gap-3" style={{ minWidth: "250px" }}>
                      <div>
                        <label className="form-label mb-1">Search</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Product"
                          onClick={(e) => e.stopPropagation()}
                          // value={searchTerm}
                          onChange={(e) => debouncedSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </Popover.Body>
                </Popover>
              </Overlay> */}
            </div>
          </Modal.Header>
          <Modal.Body >
            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={productList?.data?.filter(p => p.productTypeName === "Simple")}
                pagination
                paginationServer
                responsive
                persistTableHead
                paginationTotalRows={productList?.totalRecords}
                customStyles={customTableStyles(isDarkMode)}
                onChangePage={(page) => setPage(page)}
                onChangeRowsPerPage={(newPerPage, page) => {
                  setPerPage(newPerPage);
                  setPage(page);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleAddToBundle}
            >
              Add
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setSelectedBundleIndex(null);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )

}

export default BundleOptions
