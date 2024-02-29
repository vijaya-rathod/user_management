
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './showDetails.css';

function ShowDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const passedValue = urlParams.get('value');
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [existingData, setExistingData] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);


    const indexOfLastUser=currentPage*usersPerPage; 
        const indexOfFirstUser=indexOfLastUser-usersPerPage;
        const currentUsers=users.slice(indexOfFirstUser,indexOfLastUser);
     
        const paginate=pageNumber => setCurrentPage(pageNumber);


    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        const usersFromStorage = userData ? JSON.parse(userData) : [];
        setUsers(usersFromStorage);

        let existingData = localStorage.getItem('adminData');
        existingData = existingData ? JSON.parse(existingData) : [];
        setExistingData(existingData);

        const loggedInAdmin = existingData.find(user => user.email === passedValue && user.IsLoggedIn === true);
        if (!loggedInAdmin) {
            navigate('/adminlogin');
        } else {
            setAdmin(loggedInAdmin);
        }
    }, [navigate, passedValue]);

    const logout = () => {
        const updatedAdminData = existingData.map(user =>
            user.email === passedValue ? { ...user, IsLoggedIn: false } : user
        );
        localStorage.setItem('adminData', JSON.stringify(updatedAdminData));
        navigate('/adminlogin');
    };

    const updateUserStatus = (index) => {
        const updatedUsers = users.map((user, i) => {
            if (i === indexOfFirstUser + index) {
                if (user.userStatus === '-') {
                    return { ...user, userStatus: 'Approved' };
                } else if (user.userStatus === 'Approved') {
                    return { ...user, userStatus: 'Denied' };
                } else if (user.userStatus === 'Denied') {
                    return { ...user, userStatus: 'Approved' };
                }
            }
            return user;
        });
        setUsers(updatedUsers);
        localStorage.setItem('userData', JSON.stringify(updatedUsers));
    };
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    let count=0;
    return (
        <div className="data-container">
            <div className='center'>
                <h2>User Details</h2>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>SI.NO</th>
                        <th>Username</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Qualification</th>
                        <th>Update Status</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1 + (currentPage - 1) * usersPerPage}</td>
                            <td>{user.username}</td>
                            <td>{user.mobile}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.dob}</td>
                            <td>{user.qualification}</td>
                            <td>
                                <button className="change-button" onClick={() => updateUserStatus(index)}>
                                    {user.userStatus === '-' ? 'Approve' : (user.userStatus === 'Approved' ? 'Deny' : 'Approve')}
                                </button>
                            </td>
                            <td>{user.userStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className='logoutButton'><button onClick={logout}>Logout</button></p>
            <div className='pagination-container'>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='pagebutton'>Previous</button>
            {pageNumbers.map(number => (
                    <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : 'normal'}>
                        {number}
                    </button>
                ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentUsers.length < usersPerPage} className='pagebutton'>Next</button>
            </div>
  </div>
    );
}

export default ShowDetails;