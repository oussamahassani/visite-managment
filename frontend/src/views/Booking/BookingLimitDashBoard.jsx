import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import axiosInstance from "axiosInstance";
import { useNavigate } from "react-router-dom";

function BookingLimitDashBoard() {
    const [bookinglimits, setBookinglimits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();
    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/searchbookinglimits?search=${searchQuery}`);
            setBookinglimits(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching booking limits:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/bookinglimits/')
            .then((response) => {

                setBookinglimits(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

            });

    }, []);


    const applySearchFilter = (bookinglimit) => {

        return (
            bookinglimit.Booking_Date.includes(searchQuery) ||
            bookinglimit.Booking_Limit.toString().includes(searchQuery)
        );
    };


    const filteredBooking = bookinglimits.filter(applySearchFilter);

    const handleDeleteBooking = (id) => {
        setLoading(true);
        axiosInstance
            .delete(`/bookinglimits/${id}`)
            .then(() => {
                setLoading(false);
                alert('Successfully deleted');
                // navigate('/booking/bookinglimit-list');
                window.location.reload(false)
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check Console for more information');
                console.log(error);
            });
    };

    return (
        <div >
            <div className="sb-nav-fixed">

                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav-link">
                                    <div className="sb-nav-link-icon">
                                        <button
                                            onClick={() => { window.location.href = '/admin/booking/bookinglimit' }} className='btn btn-success'
                                        >
                                            Add Booking Limit
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/admin/booking/booking-list' }} className='btn btn-primary'
                                        >
                                            All Bookings
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        {loading ? (<Spinner />) : (
                            <main>
                                <div className="">
                                    <div className="">
                                        <div className='' ref={componentRef}>
                                            <table className='table table-bordered'>
                                                <thead >
                                                    <tr>
                                                        <th >Booking_Date</th>
                                                        <th >Booking_Limit</th>
                                                        <th >Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredBooking.map((bookinglimit) => (
                                                        <tr key={bookinglimit.id} className='h-8'>

                                                            <td >{bookinglimit.Booking_Date.slice(0, 10)}</td>
                                                            <td >{bookinglimit.Booking_Limit}</td>
                                                            <td >
                                                                <div className='flex justify-center gap-x-4'>
                                                                    <Link to={`/admin/booking/bookinglimitEdit/${bookinglimit.id}`}>
                                                                        <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                                                    </Link>

                                                                    <MdOutlineDelete className='text-2x1 text-red-600' onClick={() => handleDeleteBooking(bookinglimit.id)} />

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingLimitDashBoard;
