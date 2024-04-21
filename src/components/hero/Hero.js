import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
// import {Link, useNavigate} from "react-router-dom";
import { Link, NavLink, useNavigate } from 'react-router-dom'; //
import Button from 'react-bootstrap/Button';
import Footer from '../footer/Footer';


const Hero = ({builds}) => {

    const navigate = useNavigate();

    function reviews(buildId)

    {
        navigate(`/Reviews/${buildId}`);
    }

    return (
        <div className='build-carousel-container'>
          <Carousel>
            {builds?.map((build) => {
              return (
                <Paper key={build.buildid}>
                  <div className='build-card-container'>
                    <div className='build-card' style={{ '--img': `url(${build.backdrops[0]})` }}>
                      <div className='build-detail'>
                        <div className='build-poster'>
                          <img src={build.poster} alt='' />
                        </div>
                        <div className='build-buildname'>
                          <h4>{build.buildname}</h4>
                        </div>
                        <div className='build-buttons-container'>
                          <Link to={`/Buildlink/${build.buildlinks.substring(build.buildlinks.length - 11)}`}>
                            <div className='play-button-icon-container'>
                              <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                            </div>
                          </Link>
                          <div className='build-review-button-container'>
                            <Button variant='info' onClick={() => reviews(build.buildid)}>
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              );
            })}
          </Carousel>
          <Footer />
        </div>
      );
    };
export default Hero