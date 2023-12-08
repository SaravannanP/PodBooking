import React, { useState,useEffect} from "react";
import { Dropdown, Form, Space ,Typography,DatePicker,TimePicker, Button} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import moment from "moment";
const items = [
    {
        key: '0',
        label: 'Pod 1',
        location: 'Green Room',
    },
    {
        key: '1',
        label: 'Pod 2',
        location: 'Blue Room',
    },
    {
        key: '2',
        label: 'Pod 3',
        location: 'Red Room',
    },
    {
        key: '3',
        label: 'Pod 4',
        location: 'Purple Room',
    },
    {
        key: '4',
        label: 'Pod 5',
        location: 'Yellow Room',
    },
    {
        key: '5',
        label: 'Pod 6',
        location: 'Orange Room',
    },
    {
        key: '6',
        label: 'Pod 7',
        location: 'Pink Room',
    },
    {
        key: '7',
        label: 'Pod 8',
        location: 'Black Room',
    },
    {
        key: '8',
        label: 'Select Pod Number ',
        location: 'Default location',
    }
        

];

const NewBookingModal = ({onFormSubmit}) =>
{
    const [form] = Form.useForm();
    const [selectedPod,setSelectedPod] = useState({location: 'Default location'});
    const [selectedTime,setSelectedTime] = useState();
    const handlePodSelect = (key) => {
        const pod = items.find(item =>item.key === key);
        console.log("Selected Pod",pod);
        setSelectedPod(pod);
        form.setFieldsValue({podLocation: pod.location})
    } 
    const onFinish = (values) => {
        console.log('Success',values);
        onFormSubmit(values);
    };
    
    const onFinishFailed = () => {
        console.log('Failed');
    }

    const startTime = () => {
        return{
            disabledHours: () => [0,1,2,3,4,5,6,7,8,9,10,11,20,21,22,23],
            disabledMinutes: () => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
        };
    }

    const timeChange = (time) => {
        setSelectedTime(time);
    }

    const durationRange = (time) => {
            if(!selectedTime) return false;

            if(selectedTime.hour() === 19)
            {
                return {
            
                    disabledHours: () => [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                    disabledMinutes: () => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
                };       
            }
            
            if(selectedTime.hour() === 19 && selectedTime.minute() === 30)
            {
                return {
            
                    disabledHours: () => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                    disabledMinutes: () => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
                };       
            }

            return {
                
                disabledHours: () => [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                disabledMinutes: () => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
            };
    }

    const disablePastDates = (current) => {
        return current && current < moment().startOf('day');
    }

    const userNamePattern = /^[A-Za-z]+$/;
    const idNumberpattern = /[a-zA-Z]\d{7}[a-zA-Z]$/;
    return(
        <Form 
            form={form}
            name = "basic"
            layout="horizontal"
            labelCol={{
                span:8,
            }}
            wrapperCol={{
                    span:16,
            }}
            style={{
                maxWidth:600,
            }}
            initialValues={{
                remember:true,
                name: '',
                idNumber: '',
                podNum: items[0].key,
                podLocation: selectedPod.location,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            
            <Form.Item
                label = "Name"
                name = "name"
                rules={[
                    {
                        required:true,
                        message: 'Please input your name'
                    },
                    {
                        pattern: userNamePattern,
                        message: 'name cannot include numbers and underscores'
                    },
                ]}
            >
                <input/>
            </Form.Item>
              
            <Form.Item
                label = "NRIC/FIN"
                name = "idNumber"
                rules={[
                    {
                        required:true,
                        message: 'Please input your NRIC/FIN number'
                    },
                    {
                        pattern: idNumberpattern,
                        message: 'Not a valid NRIC/FIN number'
                    },
                ]}
            >
                <input/>
            </Form.Item>
            <Form.Item
                label = "Pod Number"
                name = "podNum"
                rules={[
                    {
                        required:true,
                        message: 'please select a pod number'
                    }
                ]}
            >
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys:[selectedPod.key],
                        onSelect: ({key}) => handlePodSelect(key)
                    }}
                >
                    <Typography.Link>
                        <Space>
                            {selectedPod.label ? selectedPod.label : "Select Pod Number"}
                            
                            <DownOutlined/>
                        </Space>
                    </Typography.Link>
                </Dropdown>
            </Form.Item>
            <Form.Item
                
                label = "Pod Location"
                name = "podLocation"
            >
                <input disabled value ={selectedPod.location} />
            </Form.Item>
            <Form.Item
                disabled
                label = "Date"
                name = "date"
                rules={[
                    {
                        required:true,
                        message: 'Please choose a date'
                    }
                ]}
            >
                <DatePicker disabledDate={disablePastDates}/>
            </Form.Item>
            <Form.Item
                  label = "Time"
                  name = "time"
                  rules={[
                    {
                        required:true,
                        message: 'Please Select preferred Time'
                    }
                ]}
            >
                
                <TimePicker 
                    format="HH:mm"
                    disabledOpenValue={moment('12:00','HH:mm')}
                    disabledTime={startTime}
                    onChange={timeChange}
                />
            </Form.Item>
            <Form.Item
                label = "Duration"
                name = "duration"
                rules={[
                    {
                        required:true,
                        message: 'Please Select preferred Duration'
                    }
                ]}
            >
                <TimePicker
                    format="HH:mm"
                    disabledOpenValue={moment('00:30','HH:mm')}
                    disabledTime={durationRange}
                    // onChange={timeChange}
                />
            </Form.Item>
            <Form.Item wrapperCol={{offset:8,span:16}}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>

        </Form>
    )
    
}


export default NewBookingModal;