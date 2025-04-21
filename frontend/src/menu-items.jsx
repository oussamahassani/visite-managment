

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
          url: '/admin/app/dashboard/analytics'
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
              url: '/admin/basic/add-vehicle'
            },
            {
              id: 'badges',
              title: 'Vehicle List',
              type: 'item',
              url: '/admin/basic/vehicles-list'
            },
            {
              id: 'overall-details',
              title: 'Overall Details',
              type: 'item',
              url: '/admin/basic/overall-details'
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
              url: '/admin/booking/bookinglimit'
            },
            {
              id: 'customer-list',
              title: ' Booking limit List',
              type: 'item',
              url: '/admin/booking/bookinglimit-list'
            },
            {
              id: 'add-Booking',
              title: 'Add Booking ',
              type: 'item',
              url: '/admin/booking/booking-create'
            },
            {
              id: 'book-list',
              title: ' Booking  List',
              type: 'item',
              url: '/admin/booking/booking-list'
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
              url: '/admin/basic/add-customer'
            },
            {
              id: 'customer-list',
              title: 'Customer List',
              type: 'item',
              url: '/admin/basic/customers-list'
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
              url: '/admin/basic/add-order'
            },
            {
              id: 'order-list',
              title: 'Order List',
              type: 'item',
              url: '/admin/basic/order-list'
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
              url: '/admin/basic/add-payment'
            },
            {
              id: 'orders-payment',
              title: 'Orders Payment',
              type: 'item',
              url: '/admin/basic/orders-payment'
            },
            {
              id: 'payment-list',
              title: 'Payment List',
              type: 'item',
              url: '/admin/basic/payment-list'
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
              url: '/admin/basic/add-expense'
            },
            {
              id: 'expense-list',
              title: 'Expense List',
              type: 'item',
              url: '/admin/basic/expense-list'
            }
          ]
        },
      ]
    },



  ]
};

export default menuItems;
