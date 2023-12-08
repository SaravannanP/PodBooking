import React, { useState } from 'react';
import {Button, Modal} from 'antd';
import NewBookingModal from './NewBookingModal';
import {useNavigate} from "react-router-dom";


const MainPage = () => 
{
    let navigate = useNavigate();
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [bookingData,setBookingData] = useState();
    const showModal = () =>
    {
        setIsModalOpen(true);
    }

    const closeModal = () =>
    {
        setIsModalOpen(false);
    }

    const confirmBooking = (data) =>
    {
        setBookingData(data)
        navigate('/acknowledgement-page',{state:{bookingData: data}});
    }

    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button onClick={showModal} >New Booking</Button>
        <Modal open={isModalOpen}  onCancel={closeModal} footer={[
            <Button key = "back" onClick={closeModal}> 
                Cancel 
            </Button>
        ]}>
            <NewBookingModal onFormSubmit={confirmBooking}/>
        </Modal>
        </div>
    );
    
}

export default MainPage;