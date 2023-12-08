import React from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import { Descriptions,Button } from 'antd';
import  './AcknowledgementPage.css';
import moment from 'moment';

const AcknowledgementPage = () =>
{
    let navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state?.bookingData;
    const formatDate = (dateObj) =>
    {
        return dateObj.$d.toString();
    }
    const confirmBooking = () =>
    {
        navigate('/');
    }
    
    const getEndTime = (startTime,duration) => {
        const start = moment(startTime,"HH:mm");

        const durationParts = duration.match(/(\d+)\sHr\s(\d+)\smins/);
        const hours = parseInt(durationParts[1],10);
        const minutes = parseInt(duration[2],10);

        const end = start.add(hours,'hours').add(minutes,'minutes');

        return end.format("HH:mm");
    }

    const startTime = formatDate(bookingData.time).substring(16,21);
    const duration = `${formatDate(bookingData.duration).substring(17,18)} Hr ${formatDate(bookingData.duration).substring(19,20)} mins`;

    const endTime = getEndTime(startTime,duration);
    return(
        
        <div style = {{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh'
        }}>
            <div style={{
                width: '50vh',
                height: '50vh',
                backgroundColor: 'white',
                borderRadius: '13px',
                padding: '50px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                paddingTop: '0'
            }}>
            
                <Descriptions layout='horizontal' column={2} labelStyle={{fontWeight:'bold', color: 'black'}}>
                    <Descriptions.Item className="descriptionItem" label="Name">{bookingData.name}</Descriptions.Item>
                    <Descriptions.Item className="descriptionItem" label="NRIC/FIN">{bookingData.idNumber}</Descriptions.Item>
                    <Descriptions.Item className="descriptionItem" label="Pod Location">{bookingData.podLocation}</Descriptions.Item>
                    <Descriptions.Item className="descriptionItem" label="Date">{formatDate(bookingData.date).substring(4,15)}</Descriptions.Item>
                    <Descriptions.Item className="descriptionItem" label="Start Time">{formatDate(bookingData.time).substring(16,21)} PM</Descriptions.Item>
                    {/* <Descriptions.Item className="descriptionItem" label="Duration">{formatDate(bookingData.duration).substring(17,18)} Hr {formatDate(bookingData.duration).substring(19,21)} mins</Descriptions.Item> */}
                    <Descriptions.Item className="descriptionItem" label="End Time">{endTime} PM</Descriptions.Item>
                </Descriptions>
                <div style={{paddingTop:'10px'}}>
                    <Button onClick={confirmBooking}>Done</Button>
                </div>       
        </div>
            
        </div>
        
    );

}


export default AcknowledgementPage;