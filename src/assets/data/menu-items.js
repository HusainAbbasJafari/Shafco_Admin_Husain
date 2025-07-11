export const MENU_ITEMS = [{
  key: 'general',
  label: 'GENERAL',
  isTitle: true
},
{
  key: 'dashboard',
  label: 'Dashboard',
  icon: 'solar:widget-5-outline',
  url: '/dashboard'
},
// {
//   key: 'banner',
//   label: 'Banner Management',
//   icon: 'solar:image-outline',
//   url: '/banner-management'
// },

//  {
//   key: 'stores',
//   label: 'Stores',
//   icon: 'solar:t-shirt-bold-duotone',
//   children: [{
//     key: 'store-list',
//     label: 'List',
//     url: '/products/product-list',
//     parentKey: 'products'
//   },  {
//     key: 'create-store',
//     label: 'Create',
//     url: '/store/create-store',
//     parentKey: 'products'
//   }, {
//     key: 'edit-store',
//     label: 'Edit',
//     url: '/products/product-add',
//     parentKey: 'products'
//   }]
// },

//  {
//   key: 'category',
//   icon: 'solar:clipboard-list-bold-duotone',
//   label: 'Category',
//   children: [{
//     key: 'category-list',
//     label: 'List',
//     url: '/category/category-list',
//     parentKey: 'category'
//   }, {
//     key: 'category-edit',
//     label: 'Edit',
//     url: '/category/category-edit',
//     parentKey: 'category'
//   }, {
//     key: 'category-add',
//     label: 'Create',
//     url: '/category/category-add',
//     parentKey: 'category'
//   }]
// },
//  {
//   key: 'inventory',
//   label: 'Inventory',
//   icon: 'solar:box-bold-duotone',
//   children: [{
//     key: 'warehouse',
//     label: 'Warehouse',
//     url: '/inventory/warehouse',
//     parentKey: 'inventory'
//   }, {
//     key: 'received-orders',
//     label: 'Received Orders',
//     url: '/inventory/received-orders',
//     parentKey: 'inventory'
//   }]
// }, 
// {
//   key: 'orders',
//   label: 'Orders',
//   icon: 'solar:bag-smile-bold-duotone',
//   children: [{
//     key: 'orders-list',
//     label: 'List',
//     url: '/orders/orders-list',
//     parentKey: 'orders'
//   }, {
//     key: 'order-detail',
//     label: 'Detail',
//     url: '/orders/order-detail',
//     parentKey: 'orders'
//   }, {
//     key: 'order-cart',
//     label: 'Cart',
//     url: '/orders/order-cart',
//     parentKey: 'orders'
//   }, {
//     key: 'order-checkout',
//     label: 'Checkout',
//     url: '/orders/order-checkout',
//     parentKey: 'orders'
//   }]
// }, 
// {
//   key: 'purchases',
//   label: 'Purchases',
//   icon: 'solar:card-send-bold-duotone',
//   children: [{
//     key: 'purchase-list',
//     label: 'List',
//     url: '/purchases/purchase-list',
//     parentKey: 'purchases'
//   }, {
//     key: 'purchase-order',
//     label: 'Order',
//     url: '/purchases/purchase-order',
//     parentKey: 'purchases'
//   }, {
//     key: 'purchase-returns',
//     label: 'Returns',
//     url: '/purchases/purchase-returns',
//     parentKey: 'purchases'
//   }]
// }, 
// {
//   key: 'attributes',
//   label: 'Attributes',
//   icon: 'solar:confetti-minimalistic-bold-duotone',
//   children: [{
//     key: 'attributes-list',
//     label: 'List',
//     url: '/attributes/attributes-list',
//     parentKey: 'attributes'
//   }, {
//     key: 'attributes-edit',
//     label: 'Edit',
//     url: '/attributes/attributes-edit',
//     parentKey: 'attributes'
//   }, {
//     key: 'attributes-add',
//     label: 'Create',
//     url: '/attributes/attributes-add',
//     parentKey: 'attributes'
//   }]
// },
//  {
//   key: 'invoice',
//   label: 'Invoices',
//   icon: 'solar:bill-list-bold-duotone',
//   children: [{
//     key: 'invoice-list',
//     label: 'List',
//     url: '/invoice/invoice-list',
//     parentKey: 'invoice'
//   }, {
//     key: 'invoice-details',
//     label: 'Details',
//     url: '/invoice/invoice-details',
//     parentKey: 'invoice'
//   }, {
//     key: 'invoice-add',
//     label: 'Create',
//     url: '/invoice/invoice-add',
//     parentKey: 'invoice'
//   }]
// },
{
  key: 'settings',
  label: 'Settings',
  icon: 'solar:settings-outline',
  url: '/settings'
},
// {
//   key: 'users',
//   label: 'USERS',
//   isTitle: true
// },
{
  key: 'profile',
  label: 'Profile',
  icon: 'solar:chat-square-like-outline',
  url: '/profile'
},
{
  key: 'role',
  label: 'Roles',
  icon: 'solar:user-speak-rounded-outline',
  children: [{
    key: 'role-list',
    label: 'List',
    url: '/role/role-list',
    parentKey: 'role'
  },
  {
    key: 'role-add',
    label: 'Create',
    url: '/role/role-add',
    parentKey: 'role'
  }]
},
{
  key: 'users',
  label: 'User',
  icon: 'solar:user-outline',
  children: [{
    key: 'user-list',
    label: 'List',
    url: '/user/user-list',
    parentKey: 'users'
  },
  {
    key: 'user-add',
    label: 'Create',
    url: '/user/user-add',
    parentKey: 'users'
  }]
},
{
  key: 'warehouse',
  label: 'Warehouse',
  icon: 'solar:box-minimalistic-outline',
  children: [{
    key: 'warehouse-list',
    label: 'List',
    url: '/warehouse/warehouse-list',
    parentKey: 'warehouse'
  },
  {
    key: 'wareshouse-add',
    label: 'Create',
    url: '/warehouse/warehouse-create',
    parentKey: 'warehouse'
  }]
},
{
  key: 'store',
  label: 'Store',
  icon: 'material-symbols:storefront-outline',
  children: [{
    key: 'store-list',
    label: 'List',
    url: '/store/store-list',
    parentKey: 'store'
  },
  {
    key: 'store-add',
    label: 'Create',
    url: '/store/create-store',
    parentKey: 'warehouse'
  }]
},
{
  key: 'brands',
  label: 'Brands',
  icon: 'solar:tag-outline',
  children: [{
    key: 'brand-list',
    label: 'List',
    url: '/brands/brands-list',
    parentKey: 'brands'
  },
  {
    key: 'brand-add',
    label: 'Create',
    url: '/brands/add-brands',
    parentKey: 'brands'
  }]
},

{
  key: 'catalog',
  label: 'CATALOG',
  isTitle: true
},

{
  key: 'category',
  icon: 'solar:layers-outline',
  label: 'Category',
  children: [{
    key: 'category-list',
    label: 'List',
    url: '/category/category-list',
    parentKey: 'category'
  },
  {
    key: 'category-add',
    label: 'Create',
    url: '/category/category-add',
    parentKey: 'category'
  }]
},
{
  key: 'products',
  label: 'Products',
  icon: 'solar:t-shirt-outline',
  children: [
    {
      key: 'product-list',
      label: 'List',
      url: '/products/product-list',
      parentKey: 'products'
    },
    {
      key: 'product-add-simple',
      label: 'Create Simple Product',
      url: '/products/product-add',
      parentKey: 'products'
    },
    {
      key: 'product-add-configurable',
      label: 'Create Configurable Product',
      url: '/products/configurable-product-add',
      parentKey: 'products'
    },
    {
      key: 'product-add-bundle',
      label: 'Create Bundle',
      url: '/product-bundle/add-bundle',
      parentKey: 'products'
    },
    {
      key: 'product-bundle-list',
      label: 'Bundle List',
      url: '/product-bundle/bundle-list',
      parentKey: 'products'
    },
    // {
    //   key: 'product-tags-management',
    //   label: 'Tag Management',
    //   url: '/products/manage-tags',
    //   parentKey: 'products'
    // }


  ]
},
{
  key: 'attirbutes',
  label: 'Attributes',
  icon: 'solar:list-check-outline',
  children: [{
    key: 'attributes',
    label: 'Manage Attributes',
    url: '/products/attributes',
    parentKey: 'attirbutes'
  },
  ]
},

{
  key: 'marketing',
  label: 'MARKETING',
  isTitle: true
},

{
  key: 'promotions',
  label: 'Promotions',
  icon: 'mdi:percent-outline',
  children: [{
    key: 'category-price-rule',
    label: 'Category Price Rules',
    parentKey: 'promotions',
    children: [
      {
        key: 'list-price-rule',
        label: "Price Rule List",
        parentKey: "category-price-rule",
        url: '/promotions/category-price-rules/price-rule-list'
      },
      {
        key: 'create-price-rule',
        label: "Create Price Rule",
        parentKey: "category-price-rule",
        url: '/promotions/category-price-rules/create-price-rules'
      },
    ]
  },
  {
    key: 'cart-price-rule',
    label: 'Cart Price Rules',
    url: '*',
    parentKey: 'promotions'
  },
  {
    key: 'promotions-campaign',
    label: 'Promotion Campaigns',
    url: '*',
    parentKey: 'promotions'
  },

  {
    key: 'promotions-priority',
    label: 'Promotion Priority Management',
    url: '/promotions/priority-management',
    parentKey: 'promotions'
  },

  ]
},




  // {
  //   key: 'permissions',
  //   label: 'Permissions',
  //   icon: 'solar:checklist-minimalistic-bold-duotone',
  //   url: '/permissions'
  // },
  //  {
  //   key: 'customer',
  //   label: 'Customers',
  //   icon: 'solar:users-group-two-rounded-bold-duotone',
  //   children: [{
  //     key: 'customer-list',
  //     label: 'List',
  //     url: '/customer/customer-list',
  //     parentKey: 'customer'
  //   }, {
  //     key: 'customer-detail',
  //     label: 'Details',
  //     url: '/customer/customer-detail',
  //     parentKey: 'customer'
  //   }]
  // },
  //  {
  //   key: 'seller',
  //   label: 'Sellers',
  //   icon: 'solar:shop-bold-duotone',
  //   children: [{
  //     key: 'seller-list',
  //     label: 'List',
  //     url: '/seller/seller-list',
  //     parentKey: 'seller'
  //   }, {
  //     key: 'seller-details',
  //     label: 'Details',
  //     url: '/seller/seller-details',
  //     parentKey: 'seller'
  //   }, {
  //     key: 'seller-edit',
  //     label: 'Edit',
  //     url: '/seller/seller-edit',
  //     parentKey: 'seller'
  //   }, {
  //     key: 'seller-add',
  //     label: 'Create',
  //     url: '/seller/seller-add',
  //     parentKey: 'seller'
  //   }]
  // },
  //  {
  //   key: 'OTHER',
  //   label: 'OTHER',
  //   isTitle: true
  // },
  //  {
  //   key: 'coupons',
  //   label: 'Coupons',
  //   icon: 'solar:leaf-bold-duotone',
  //   children: [{
  //     key: 'coupons-list',
  //     label: 'List',
  //     url: '/coupons/coupons-list',
  //     parentKey: 'coupons'
  //   }, {
  //     key: 'coupons-add',
  //     label: 'Add',
  //     url: '/coupons/coupons-add',
  //     parentKey: 'coupons'
  //   }]
  // },
  //  {
  //   key: 'review',
  //   label: 'Review',
  //   icon: 'solar:chat-square-like-bold-duotone',
  //   url: '/review'
  // },
  //  {
  //   key: 'Other-apps',
  //   label: 'OTHER APPS',
  //   isTitle: true
  // },
  //  {
  //   key: 'apps-chat',
  //   label: 'Chat',
  //   icon: 'solar:chat-round-bold-duotone',
  //   url: '/apps/chat'
  // },
  //  {
  //   key: 'email',
  //   label: 'Email',
  //   icon: 'solar:mailbox-bold-duotone',
  //   url: '/apps/email'
  // },
  //  {
  //   key: 'calendar',
  //   label: 'Calendar',
  //   icon: 'solar:calendar-bold-duotone',
  //   url: '/apps/calendar'
  // }, 
  // {
  //   key: 'todo',
  //   label: 'Todo',
  //   icon: 'solar:checklist-bold-duotone',
  //   url: '/apps/todo'
  // },
  //  {
  //   key: 'support',
  //   label: 'SUPPORT',
  //   isTitle: true
  // },
  //  {
  //   key: 'help-center',
  //   label: 'Help-Center',
  //   icon: 'solar:help-bold-duotone',
  //   url: '/support/help-center'
  // },
  //  {
  //   key: 'faqs',
  //   label: 'FAQs',
  //   icon: 'solar:question-circle-bold-duotone',
  //   url: '/support/faqs'
  // },
  //  {
  //   key: 'privacy-policy',
  //   label: 'Privacy Policy',
  //   icon: 'solar:document-text-bold-duotone',
  //   url: '/support/privacy-policy'
  // },
  //  {
  //   key: 'custom',
  //   label: 'CUSTOM',
  //   isTitle: true
  // },
  //  {
  //   key: 'pages',
  //   label: 'Pages',
  //   icon: 'solar:gift-bold-duotone',
  //   children: [{
  //     key: 'welcome',
  //     label: 'Welcome',
  //     url: '/pages/welcome',
  //     parentKey: 'pages'
  //   }, {
  //     key: 'coming-soon',
  //     label: 'Coming Soon',
  //     url: '/coming-soon',
  //     parentKey: 'pages'
  //   }, {
  //     key: 'timeline',
  //     label: 'Timeline',
  //     url: '/pages/timeline',
  //     parentKey: 'pages'
  //   }, {
  //     key: 'pricing',
  //     label: 'Pricing',
  //     url: '/pages/pricing',
  //     parentKey: 'pages'
  //   }, {
  //     key: 'maintenance',
  //     label: 'Maintenance',
  //     url: '/maintenance',
  //     parentKey: 'pages'
  //   }, {
  //     key: 'pages-404',
  //     label: '404 Error',
  //     url: '/pages-404',
  //     parentKey: 'pages'
  //   }, {
  //     key: 'pages-404-alt',
  //     label: '404 Error(alt)',
  //     url: '/pages/pages-404-alt',
  //     parentKey: 'pages'
  //   }]
  // },
  //  {
  //   key: 'auth',
  //   label: 'Authentication',
  //   icon: 'solar:lock-keyhole-bold-duotone',
  //   children: [{
  //     key: 'sign-in',
  //     label: 'Sign In',
  //     url: '/auth/sign-in',
  //     parentKey: 'auth'
  //   }, {
  //     key: 'sign-up',
  //     label: 'Sign Up',
  //     url: '/auth/sign-up',
  //     parentKey: 'auth'
  //   }, {
  //     key: 'password',
  //     label: 'Reset Password',
  //     url: '/auth/reset-pass',
  //     parentKey: 'auth'
  //   }, {
  //     key: 'lock-screen',
  //     label: 'Lock Screen',
  //     url: '/auth/lock-screen',
  //     parentKey: 'auth'
  //   }]
  // },
  //  {
  //   key: 'widgets',
  //   label: 'Widgets',
  //   badge: {
  //     text: '9+',
  //     variant: 'info'
  //   },
  //   icon: 'solar:atom-bold-duotone',
  //   url: '/widgets'
  // },
  //  {
  //   key: 'components',
  //   label: 'COMPONENTS',
  //   isTitle: true
  // },
  //  {
  //   key: 'base-ui',
  //   label: 'Base UI',
  //   icon: 'solar:bookmark-square-bold-duotone',
  //   children: [{
  //     key: 'accordion',
  //     label: 'Accordion',
  //     url: '/base-ui/accordion',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'alerts',
  //     label: 'Alerts',
  //     url: '/base-ui/alerts',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'avatar',
  //     label: 'Avatar',
  //     url: '/base-ui/avatar',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'badge',
  //     label: 'Badge',
  //     url: '/base-ui/badge',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'breadcrumb',
  //     label: 'Breadcrumb',
  //     url: '/base-ui/breadcrumb',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'buttons',
  //     label: 'Buttons',
  //     url: '/base-ui/buttons',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'cards',
  //     label: 'Cards',
  //     url: '/base-ui/cards',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'carousel',
  //     label: 'Carousel',
  //     url: '/base-ui/carousel',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'collapse',
  //     label: 'Collapse',
  //     url: '/base-ui/collapse',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'dropdown',
  //     label: 'Dropdown',
  //     url: '/base-ui/dropdown',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'list-group',
  //     label: 'List Group',
  //     url: '/base-ui/list-group',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'modals',
  //     label: 'Modals',
  //     url: '/base-ui/modals',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'tabs',
  //     label: 'Tabs',
  //     url: '/base-ui/tabs',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'offcanvas',
  //     label: 'Offcanvas',
  //     url: '/base-ui/offcanvas',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'pagination',
  //     label: 'Pagination',
  //     url: '/base-ui/pagination',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'placeholders',
  //     label: 'Placeholders',
  //     url: '/base-ui/placeholders',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'popovers',
  //     label: 'Popovers',
  //     url: '/base-ui/popovers',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'progress',
  //     label: 'Progress',
  //     url: '/base-ui/progress',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'spinners',
  //     label: 'spinners',
  //     url: '/base-ui/spinners',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'toasts',
  //     label: 'Toasts',
  //     url: '/base-ui/toasts',
  //     parentKey: 'base-ui'
  //   }, {
  //     key: 'tooltips',
  //     label: 'Tooltips',
  //     url: '/base-ui/tooltips',
  //     parentKey: 'base-ui'
  //   }]
  // },
  //  {
  //   key: 'advanced-ul',
  //   label: 'Advanced Ul',
  //   icon: 'solar:case-round-bold-duotone',
  //   children: [{
  //     key: 'ratings',
  //     label: 'Ratings',
  //     url: '/advanced-ul/rating',
  //     parentKey: 'advanced-ul'
  //   }, {
  //     key: 'sweet-alert',
  //     label: 'Sweet Alert',
  //     url: '/advanced-ul/sweet-alert',
  //     parentKey: 'advanced-ul'
  //   }, {
  //     key: 'swiper-slider',
  //     label: 'Swiper Slider',
  //     url: '/advanced-ul/swiper-slider',
  //     parentKey: 'advanced-ul'
  //   }, {
  //     key: 'scrollbar',
  //     label: 'Scrollbar',
  //     url: '/advanced-ul/scrollbar',
  //     parentKey: 'advanced-ul'
  //   }, {
  //     key: 'toastify',
  //     label: 'Toastify',
  //     url: '/advanced-ul/toastify',
  //     parentKey: 'advanced-ul'
  //   }]
  // },
  //  {
  //   key: 'charts',
  //   label: 'charts',
  //   icon: 'solar:pie-chart-2-bold-duotone',
  //   children: [{
  //     key: 'area',
  //     label: 'area',
  //     url: '/charts/area',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'bar',
  //     label: 'Bar',
  //     url: '/charts/bar',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'bubble',
  //     label: 'Bubble',
  //     url: '/charts/bubble',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'candlestick',
  //     label: 'Candlestick',
  //     url: '/charts/candlestick',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'column',
  //     label: 'Column',
  //     url: '/charts/column',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'heatmap',
  //     label: 'Heatmap',
  //     url: '/charts/heatmap',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'line',
  //     label: 'Line',
  //     url: '/charts/line',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'mixed',
  //     label: 'Mixed',
  //     url: '/charts/mixed',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'timeline',
  //     label: 'Timeline',
  //     url: '/charts/timeline',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'boxplot',
  //     label: 'Boxplot',
  //     url: '/charts/boxplot',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'treemap',
  //     label: 'Treemap',
  //     url: '/charts/treemap',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'pie',
  //     label: 'Pie',
  //     url: '/charts/pie',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'radar',
  //     label: 'Radar',
  //     url: '/charts/radar',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'radialBar',
  //     label: 'RadialBar',
  //     url: '/charts/radialBar',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'scatter',
  //     label: 'Scatter',
  //     url: '/charts/scatter',
  //     parentKey: 'charts'
  //   }, {
  //     key: 'polar',
  //     label: 'Polar Area',
  //     url: '/charts/polar',
  //     parentKey: 'charts'
  //   }]
  // },
  //  {
  //   key: 'forms',
  //   label: 'Forms',
  //   icon: 'solar:book-bookmark-bold-duotone',
  //   children: [{
  //     key: 'basic',
  //     label: 'Basic Element',
  //     url: '/forms/basic',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'checkbox',
  //     label: 'Checkbox & Radio ',
  //     url: '/forms/checkbox',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'select',
  //     label: 'Choices Select',
  //     url: '/forms/select',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'clipboard',
  //     label: 'Clipboard',
  //     url: '/forms/clipboard',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'flat-picker',
  //     label: 'Flatepicker',
  //     url: '/forms/flat-picker',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'validation',
  //     label: 'Validation',
  //     url: '/forms/validation',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'wizard',
  //     label: 'Wizard',
  //     url: '/forms/wizard',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'file-uploads',
  //     label: 'File Upload',
  //     url: '/forms/file-uploads',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'editors',
  //     label: 'Editors',
  //     url: '/forms/editors',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'input-mask',
  //     label: 'Input Mask',
  //     url: '/forms/input-mask',
  //     parentKey: 'forms'
  //   }, {
  //     key: 'range-slider',
  //     label: 'Slider',
  //     url: '/forms/range-slider',
  //     parentKey: 'forms'
  //   }]
  // },
  //  {
  //   key: 'tables',
  //   label: 'Tables',
  //   icon: 'solar:tuning-2-bold-duotone',
  //   children: [{
  //     key: 'basic',
  //     label: 'Basic Tables',
  //     url: '/tables/basic',
  //     parentKey: 'tables'
  //   }, {
  //     key: 'gridjs',
  //     label: 'Grid Js',
  //     url: '/tables/gridjs',
  //     parentKey: 'tables'
  //   }]
  // },
  //  {
  //   key: 'icons',
  //   label: 'Icons',
  //   icon: 'solar:ufo-2-bold-duotone',
  //   children: [{
  //     key: 'boxicons',
  //     label: 'Box Icons',
  //     url: '/icons/boxicons',
  //     parentKey: 'icons'
  //   }, {
  //     key: 'solaricons',
  //     label: 'Solar Icons',
  //     url: '/icons/solaricons',
  //     parentKey: 'icons'
  //   }]
  // },
  //  {
  //   key: 'maps',
  //   label: 'Maps',
  //   icon: 'solar:streets-map-point-bold-duotone',
  //   children: [{
  //     key: 'google',
  //     label: 'Google Maps',
  //     url: '/maps/google',
  //     parentKey: 'maps'
  //   }, {
  //     key: 'vector',
  //     label: 'Vector Maps',
  //     url: '/maps/vector',
  //     parentKey: 'maps'
  //   }]
  // },
  //  {
  //   key: 'badge-menu',
  //   label: 'Badge Menu',
  //   badge: {
  //     text: '1',
  //     variant: 'danger'
  //   },
  //   icon: 'solar:volleyball-bold-duotone'
  // }, 
  // {
  //   key: 'menu-items',
  //   label: 'Menu Item',
  //   icon: 'solar:share-circle-bold-duotone',
  //   children: [{
  //     key: 'menu-items-1',
  //     label: 'Menu Items 1',
  //     parentKey: 'menu-items-1'
  //   },
  //    {
  //     key: 'menu-items-2',
  //     label: 'Menu Items 2',
  //     parentKey: 'menu-items-2',
  //     children: [{
  //       key: 'menu sub item',
  //       label: 'Menu Sub Item',
  //       parentKey: 'menu-items-2'
  //     }]
  //   }]
  // },
  //  {
  //   key: ' Disable Item',
  //   label: ' Disable Item',
  //   icon: 'solar:user-block-rounded-bold-duotone'
  // }
];