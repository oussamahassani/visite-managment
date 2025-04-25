
const menuItemsUser = {
    items: [


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
                            url: '/user/add-vehicle'
                        },
                        {
                            id: 'badges',
                            title: 'Vehicle List',
                            type: 'item',
                            url: '/user/voiture'
                        },
                        {
                            id: 'badgess',
                            title: 'Vehicle Details',
                            type: 'item',
                            url: '/user/voiture-details'
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
                            id: 'add-Booking',
                            title: 'Add Booking ',
                            type: 'item',
                            url: '/user/addBooking'
                        },
                        {
                            id: 'book-list',
                            title: ' Booking  List',
                            type: 'item',
                            url: '/user/bookingList'
                        }
                    ]
                },

            ]
        },




    ]
};

export default menuItemsUser;
