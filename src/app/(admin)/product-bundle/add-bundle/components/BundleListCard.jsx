"use client"
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { formatIDRCustom, stripHtmlTags } from '@/utils/other'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

const BundleListCard = ({ index, products, name, onOpenModal, onDeleteBundle, onNameChange, onQuantityChange, onSwitchChange }) => {

  return (
    <div className="p-3 border rounded">
      <Row className="align-items-center mb-3">
        <Col xs={6}>
          <div className="form-group">
            <label htmlFor={`OptionName-${index}`}>Option Name</label>
            <input type="text" className="form-control" id={`OptionName-${index}`} value={name}
              onChange={(e) => onNameChange(e.target.value)} placeholder="Enter bundle name" />
          </div>
        </Col>
        <Col xs={6} className="d-flex justify-content-end align-items-center">
          <button className="btn btn-soft-danger btn-sm" title="Delete Bundle" type="button" onClick={() => onDeleteBundle(name)}>
            <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
          </button>
        </Col>
      </Row>
      <div className="d-flex flex-column gap-3">
        <div className="heading fs-5 fw-bold">Product Options</div>
        <ul className="list-group">
          {products.length === 0 ? (
            <li className="list-group-item">No products selected.</li>
          ) : (
            products.filter(product => !product.isDeletedProduct).map((product, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center p-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={
                      product?.productImage ||
                      (Array.isArray(product?.defaultImageUrl) && product.defaultImageUrl[0]) ||
                      'https://shorturl.at/MAEWU'
                    }
                    alt={product?.productName}
                    className="rounded"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h6 className="mb-1 fw-semibold">{product.productName}</h6>
                    <p className="mb-0 text-muted small">{stripHtmlTags(product?.productDescription || '')}</p>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <div className="form-group">
                    {/* <label htmlFor={`quantity-${i}`}>Quantity</label> */}
                    <input
                      type="number"
                      className="form-control"
                      id={`quantity-${i}`}
                      value={product?.quantity || 1}
                      onChange={(e) => onQuantityChange(product.id || product.productId, e.target.value)}
                      min={1}
                    />
                  </div>
                  <div className="fw-semibold bg-light rounded py-1 px-2">Rp {formatIDRCustom(product.price || 0)}</div>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`selectProduct-${i}`}
                      checked={product.isActive ?? true}
                      onChange={(e) => onSwitchChange(product.id || product.productId, e.target.checked)}


                    />
                  </div>

                </div>
              </li>
            ))
          )}
        </ul>
        <button type="button" className="btn btn-outline-primary btn-sm align-self-start d-flex align-items-center gap-1" onClick={onOpenModal}>
          <IconifyIcon icon="bx:bx-plus" /><div>Select Products</div></button>
      </div>
    </div>
  )
}

export default BundleListCard
