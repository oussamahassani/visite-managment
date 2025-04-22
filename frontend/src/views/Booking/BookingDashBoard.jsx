import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from "axiosInstance";
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import ReportBookings from '../Booking/ReportBookings';

function BookingDashBoard() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/searchbooking?search=${searchQuery}`);
            setBookings(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const role = localStorage.getItem("role")
        const userId = localStorage.getItem("user")
        const url = "/bookings/"
        if (role !== "Admin") {
            url = "/bookings/byuser/" + userId
        }
        axiosInstance
            .get(url)
            .then((response) => {

                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

            });

    }, []);


    const applySearchFilter = (booking) => {
        return (
            booking.Customer_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Vehicle_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Booking_Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Booking_Date.includes(searchQuery) ||
            booking.Contact_Number.includes(searchQuery)
        );
    };

    const filteredBooking = bookings.filter(applySearchFilter);


    return (
        <div >
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" value={searchQuery} placeholder="Search for..." aria-label="Search for..." onChange={(e) => setSearchQuery(e.target.value)} aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" onClick={handleSearch} type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            <div className="sb-nav-fixed">

                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav-link">
                                    <div className="sb-nav-link-icon">

                                        <button
                                            onClick={() => { window.location.href = '/booking/adminbooking' }}
                                        >
                                            Add Booking
                                        </button>
                                        <button
                                            onClick={() => { window.location.href = '/booking/dashboard' }}
                                        >
                                            All Bookings
                                        </button>
                                        <div
                                        >
                                            <ReportBookings filteredBooking={filteredBooking} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        {loading ? (<Spinner />) : (
                            <main>
                                <div className="">
                                    <h1 >Booking Dashboard</h1>
                                    <div className="">
                                        <div className='' ref={componentRef}>
                                            <table className='table table-bordered' >
                                                <thead >
                                                    <tr>
                                                        <th >No</th>
                                                        <th >Booking_ID</th>
                                                        <th >Customer_Name</th>
                                                        <th >Vehicle_Type</th>
                                                        <th >Vehicle_Number</th>
                                                        <th >Contact_Number</th>
                                                        <th >Email</th>
                                                        <th >Booking_Date</th>
                                                        <th >Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredBooking.map((booking, index) => (
                                                        <tr key={booking._id} className='h-8'>
                                                            <td >{index + 1}</td>
                                                            <td >{booking.Booking_Id}</td>
                                                            <td >{booking.Customer_Name}</td>
                                                            <td >{booking.Vehicle_Type}</td>
                                                            <td >{booking.Vehicle_Number}</td>
                                                            <td >{booking.Contact_Number}</td>
                                                            <td >{booking.Email}</td>
                                                            <td >{booking.Booking_Date.slice(0, 10)}</td>
                                                            <td >
                                                                <div className='flex justify-center gap-x-4'>
                                                                    <Link to={`/booking/read/${booking._id}`}>
                                                                        <BsInfoCircle className='text-2x1 text-green-800' />
                                                                    </Link>
                                                                    <Link to={`/edit/${booking._id}`}>
                                                                        <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                                                    </Link>
                                                                    <Link to={`/booking/delete/${booking._id}`}>
                                                                        <MdOutlineDelete className='text-2x1 text-red-600' />
                                                                    </Link>
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

export default BookingDashBoard;
