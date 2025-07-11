'use client';

import ConfirmationModal from '@/components/ConfirmationModal';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useNotificationContext } from '@/context/useNotificationContext';
import { customTableStyles, debounce, detectDarkMode, encodeId, formatIDRCustom, stripHtmlTags } from '@/utils/other';
import { useEffect, useState, useRef } from 'react';
import { Button, Card, CardHeader, CardTitle, Dropdown, DropdownMenu, DropdownToggle, ModalBody, ModalFooter, ModalHeader, ModalTitle, Overlay, Popover } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useQueryClient } from '@tanstack/react-query';
import { useProductBundleList } from '@/services/bundleServices';
import api from '@/services/api';



const ProductBundleList = () => {
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const [deleteProps, setDeleteProps] = useState({ modal: false, id: null });
	const { showNotification } = useNotificationContext();

	const target = useRef(null);

	const queryClient = useQueryClient();

	const { data: productBundleList } = useProductBundleList({ pageSize: perPage, pageNumber: page, searchTerm })



	useEffect(() => {
		const mode = detectDarkMode(setIsDarkMode);
		setIsDarkMode(mode);
	}, []);

	useEffect(() => {
		queryClient.invalidateQueries(['productBundleList']);
	}, []);

	const debouncedSearch = debounce((value) => {
		setSearchTerm(value);
	}, 600);



	const handleDelete = (id) => {
		setDeleteProps({ modal: true, id });
	};

	const deleteBundle = async () => {
		try {
			const response = await api.post(`/api/ProductBundle/DeleteBundle?bundleId=${deleteProps?.id}`);
			if (response.data.statusCode === 200 && response.data.isSuccess === true) {
				showNotification({
					message: response.data.message || "Delete Success!",
					variant: "success",
				});
				queryClient.invalidateQueries(['productBundleList']);
				setDeleteProps({ modal: false, id: null });
			} else {
				showNotification({
					message: response.data.message || "Delete Failed!",
					variant: "danger",
				});
				setDeleteProps({ modal: false, id: null })
			}
		} catch (error) {
			showNotification({
				message: error?.response?.data?.message || "An error occurred during category deletion.",
				variant: "danger",
			});
			setDeleteProps({ modal: false, id: null })
		}
	};

	const filteredData = productBundleList?.data?.filter((item) =>
		item.bundleName?.toLowerCase().includes(searchTerm.toLowerCase())
	);


	const columns = [
		{
			name: 'Product Image',
			selector: (row) => row.imageUrl,
			cell: (row) => (
				<div className="d-flex align-items-center p-2">
					<div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
						{row.imageUrl && (
							<img
								src={
									Array.isArray(row.imageUrl)
										? row.imageUrl[0]
										: row.imageUrl || 'https://shorturl.at/MAEWU'
								}
								alt={`product${row.id}`}
								className="avatar-md"
								onError={(e) =>
									(e.currentTarget.src = 'https://shorturl.at/MAEWU')
								}
							/>
						)}
					</div>
				</div>
			),
			sortable: false,
		},
		{
			name: 'Bundle Name',
			selector: (row) => row.bundleName,
			sortable: true,
		},
		{
			name: 'Description',
			selector: (row) => stripHtmlTags(row.description),
			sortable: false,
		},
		{
			name: 'SKU',
			selector: (row) => row?.sku || 'N/A',
			sortable: true,
		},
		{
			name: 'Price',
			selector: (row) => formatIDRCustom(row?.totalPrice) || 'N/A',
			sortable: true,
		},
		// {
		// 	name: 'Option Name',
		// 	selector: (row) => row.productBundleItems?.[0]?.itemTitle || 'N/A',
		// 	sortable: false,
		// },
		// {
		// 	name: 'Options',
		// 	cell: (row) => {
		// 		const allOptions = row.productBundleItems?.flatMap(
		// 			(itemGroup) =>
		// 				itemGroup.bundleItemProductsWithStatus?.map(
		// 					(item) => item.productName
		// 				) || []
		// 		) || [];

		// 		const maxDisplay = 3;
		// 		const showMore = allOptions.length > maxDisplay;
		// 		const displayItems = showMore
		// 			? allOptions.slice(0, maxDisplay - 1)
		// 			: allOptions;
		// 		const tooltipText = allOptions.join(', ');

		// 		return (
		// 			<div title={tooltipText}>
		// 				<ul className="list-group list-unstyled mb-0">
		// 					{displayItems.map((name, index) => (
		// 						<li key={index}>{name}</li>
		// 					))}
		// 					{showMore && (
		// 						<li className="text-muted">+{allOptions.length - (maxDisplay - 1)} more</li>
		// 					)}
		// 				</ul>
		// 			</div>
		// 		);
		// 	},
		// 	sortable: false,
		// },
		{
			name: 'Actions',
			cell: (row) => (
				<div className="d-flex gap-1">
					<a
						href={`/product-bundle/bundle-edit/${encodeId(row.id)}`}
						className="btn btn-soft-primary btn-sm"
						title="Edit Bundle"
					>
						<IconifyIcon
							icon="solar:pen-2-broken"
							className="align-middle fs-18"
						/>
					</a>
					<button
						className="btn btn-soft-danger btn-sm"
						onClick={() => handleDelete(row.id)}
						title="Delete Bundle"
					>
						<IconifyIcon
							icon="solar:trash-bin-minimalistic-2-broken"
							className="align-middle fs-18"
						/>
					</button>
				</div>
			),
			ignoreRowClick: true,
			allowOverflow: false,
			button: true,
			width: '200px',
		},
	];

	return (
		<>
			<div className="mb-3 d-flex justify-content-end position-relative">
				<button
					className="btn btn-outline-primary d-flex align-items-center gap-1"
					ref={target}
					onClick={() => setShowFilters(!showFilters)}
				>
					<IconifyIcon icon="tabler:filter" className="fs-5" />
				</button>

				<Overlay target={target.current} show={showFilters} placement="bottom-end" rootClose onHide={() => setShowFilters(false)}>
					<Popover id="filter-popover" className="shadow-sm border-0">
						<Popover.Body>
							<div className="d-flex flex-column gap-3" style={{ minWidth: '250px' }}>
								<div>
									<label className="form-label mb-1">Search</label>
									<input
										type="text"
										className="form-control"
										placeholder="Search Bundle"
										onChange={(e) => debouncedSearch(e.target.value)}
									/>
								</div>
							</div>
						</Popover.Body>
					</Popover>
				</Overlay>
			</div>

			<Card>
				<CardHeader className="d-flex justify-content-between align-items-center gap-1">
					<CardTitle as="h4" className="flex-grow-1">
						Product Bundle List
					</CardTitle>
				</CardHeader>

				<div className="table-responsive">
					<DataTable
						columns={columns}
						data={filteredData}
						pagination
						persistTableHead
						responsive
						customStyles={customTableStyles(isDarkMode)}
						paginationServer
						onChangePage={(page) => setPage(page)}
						onChangeRowsPerPage={(newPerPage) => {
							setPerPage(newPerPage);
							setPage(1);
						}}
					/>
				</div>

				<ConfirmationModal show={deleteProps.modal} onHide={() => setDeleteProps({ modal: false, id: null })}>
					<ModalHeader closeButton>
						<ModalTitle>Confirm Delete</ModalTitle>
					</ModalHeader>
					<ModalBody>Are you sure you want to delete this bundle?</ModalBody>
					<ModalFooter>
						<Button variant="secondary" onClick={() => setDeleteProps({ modal: false, id: null })}>
							Cancel
						</Button>
						<Button variant="danger" onClick={deleteBundle}>
							Delete
						</Button>
					</ModalFooter>
				</ConfirmationModal>
			</Card>
		</>
	);
};

export default ProductBundleList;
