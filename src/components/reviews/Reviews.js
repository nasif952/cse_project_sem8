import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'
import './reviews.css';

import { useAuth } from '../../contexts/AuthContext';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const Reviews = ({getBuildData,build,reviews,setReviews}) => {
    const { isAuthenticated } = useAuth();
    const { isAdminAuthenticated } = useAdminAuth();

    const revText = useRef();
    let params = useParams();
    const buildId = params.buildId;

    useEffect(()=>{
        getBuildData(buildId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
                        // Check if user is authenticated as a regular user or an admin
                        if (!isAuthenticated && !isAdminAuthenticated) {
                            alert('You need to be logged in as a user or admin to submit a review.');
                            return;
                        }
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,buildid:buildId});

            const updatedReviews = [ {body:rev.value}];
    
            rev.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={build?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }



                {
                    build?.reviewIds.map((sub) => {
                        return(
                            <>
                                <Row>
                                    <Col>{sub.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
        <Container>
            {/* Display build details */}
            <Row className="mt-3">
                <Col><h3 >{build?.buildname}</h3></Col>

            </Row>

            
            <Row>
            <Col><strong>Name:</strong> {build?.buildname}</Col>


            </Row>
            <Row>
                <Col><strong>CPU:</strong> {build?.cpu}</Col>
                <Col><strong>RAM:</strong> {build?.ram}</Col>
                <Col><strong>Cost:</strong> ${build?.cost}</Col>

            </Row>
            <Row>
                <Col><strong>PSU:</strong> {build?.psu}</Col>
                <Col><strong>GPU:</strong> {build?.gpu}</Col>
                <Col><strong>Storage:</strong> {build?.storage}</Col>
                
            </Row>
            <Row>
                <Col><strong>Details:</strong> {build?.details}</Col>
                
            </Row>
            <Row>
               <Col><strong>Info:</strong> {build?.info}</Col>
            </Row>
            

            
        </Container>        
    </Container>
  )
}

export default Reviews
