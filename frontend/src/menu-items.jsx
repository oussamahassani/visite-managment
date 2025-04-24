

const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: '0-0',
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
          title: 'ControleCenter',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Add ControleCenter',
              type: 'item',
              url: '/admin/controlecenter/add'
            },
            {
              id: 'badges',
              title: 'ControleCenter List',
              type: 'item',
              url: '/admin/controlecenter/liste'
            },

          ]
        },
        {
          id: 'component',
          title: 'Vehicles',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button-01',
              title: 'Add Vehicles',
              type: 'item',
              url: '/admin/basic/add-vehicle'
            },
            {
              id: 'badges-02',
              title: 'Vehicle List',
              type: 'item',
              url: '/admin/basic/vehicles-list'
            },
            {
              id: 'overall-details-03',
              title: 'Overall Details',
              type: 'item',
              url: '/admin/basic/overall-details'
            },
          ]
        },
        {
          id: 'booking-04',
          title: 'Booking',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-Booking-limit-05',
              title: 'Add Booking limit',
              type: 'item',
              url: '/admin/booking/bookinglimit'
            },
            {
              id: 'customer-list-06',
              title: ' Booking limit List',
              type: 'item',
              url: '/admin/booking/bookinglimit-list'
            },
            {
              id: 'add-Booking-07',
              title: 'Add Booking ',
              type: 'item',
              url: '/admin/booking/booking-create'
            },
            {
              id: 'book-list-08',
              title: ' Booking  List',
              type: 'item',
              url: '/admin/booking/booking-list'
            }
          ]
        },
        {
          id: 'customer-09',
          title: 'Customer',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-customer-10',
              title: 'Add Customer',
              type: 'item',
              url: '/admin/basic/add-customer'
            },
            {
              id: 'customer-list-11',
              title: 'Customer List',
              type: 'item',
              url: '/admin/basic/customers-list'
            }
          ]
        },
        {
          id: 'order-12',
          title: 'Visit',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-order-13',
              title: 'Add Visit',
              type: 'item',
              url: '/admin/basic/add-order'
            },
            {
              id: 'order-list-14',
              title: 'Visit List',
              type: 'item',
              url: '/admin/basic/order-list'
            }
          ]
        },
        {
          id: 'payment-15',
          title: 'Payment',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-payment-16',
              title: 'Add Payment',
              type: 'item',
              url: '/admin/basic/add-payment'
            },
            {
              id: 'orders-payment-17',
              title: 'Orders Payment',
              type: 'item',
              url: '/admin/basic/orders-payment'
            },
            {
              id: 'payment-list-18',
              title: 'Payment List',
              type: 'item',
              url: '/admin/basic/payment-list'
            },

          ]
        },

        {
          id: 'expense-19',
          title: 'Expense',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'add-expense-20',
              title: 'Add Expense',
              type: 'item',
              url: '/admin/basic/add-expense'
            },
            {
              id: 'expense-list-21',
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
