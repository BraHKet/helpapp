import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/requests', {
                headers: {
                    Authorization: `Bearer ${ ▋