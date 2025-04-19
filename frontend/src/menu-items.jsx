

const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/analytics'
        }
      ]
    },

    {
      id: 'utilities',
      title: 'Utilities',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Vehicles',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Add Vehicles',
              type: 'item',
              url: '/basic/add-vehicle'
            },
            {
              id: 'badges',
              title: 'Vehicle List',
              type: 'item',
              url: '/basic/vehicles-list'
            },
            {
              id: 'overall-details',
              title: 'Overall Details',
              type: 'item',
              url: '/basic/overall-details'
            },
          ]
        },
        {
          id: 'booking',
          title: 'Booking',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-Booking-limit',
              title: 'Add Booking limit',
              type: 'item',
              url: '/booking/bookinglimit'
            },
            {
              id: 'customer-list',
              title: ' Booking limit List',
              type: 'item',
              url: '/booking/bookinglimit-list'
            },
            {
              id: 'add-Booking',
              title: 'Add Booking ',
              type: 'item',
              url: '/booking/booking-create'
            },
            {
              id: 'book-list',
              title: ' Booking  List',
              type: 'item',
              url: '/booking/booking-list'
            }
          ]
        },
        {
          id: 'customer',
          title: 'Customer',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-customer',
              title: 'Add Customer',
              type: 'item',
              url: '/basic/add-customer'
            },
            {
              id: 'customer-list',
              title: 'Customer List',
              type: 'item',
              url: '/basic/customers-list'
            }
          ]
        },
        {
          id: 'order',
          title: 'Orders',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-order',
              title: 'Add Order',
              type: 'item',
              url: '/basic/add-order'
            },
            {
              id: 'order-list',
              title: 'Order List',
              type: 'item',
              url: '/basic/order-list'
            }
          ]
        },
        {
          id: 'payment',
          title: 'Payment',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-payment',
              title: 'Add Payment',
              type: 'item',
              url: '/basic/add-payment'
            },
            {
              id: 'orders-payment',
              title: 'Orders Payment',
              type: 'item',
              url: '/basic/orders-payment'
            },
            {
              id: 'payment-list',
              title: 'Payment List',
              type: 'item',
              url: '/basic/payment-list'
            },
           
          ]
        },

        {
          id: 'expense',
          title: 'Expense',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-expense',
              title: 'Add Expense',
              type: 'item',
              url: '/basic/add-expense'
            },
            {
              id: 'expense-list',
              title: 'Expense List',
              type: 'item',
              url: '/basic/expense-list'
            }
          ]
        },
      ]
    },
    

   
    // {
    //   id: 'payment',
    //   title: 'Payment',
    //   type: 'group',
    //   icon: 'icon-support',
    //   children: [
    //     {
    //       id: 'sample-page',
    //       title: 'Order Wise',
    //       type: 'item',
    //       url: '/sample-page',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar'
    //     },
    //     {
    //       id: 'customer-wise',
    //       title: 'Customer Wise',
    //       type: 'item',
    //       url:'/sample-rate',
    //       classes: 'nav-item',
    //       icon: 'feather icon-sidebar'
    //     }

    //   ]
    // },
  ]
};

export default menuItems;
