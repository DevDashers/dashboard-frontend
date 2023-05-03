import { Component } from "react";
import { Image, Row, Col } from "react-bootstrap";
import { Github, Linkedin } from "react-bootstrap-icons";
import developers from '../team.json'

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    // return <p>Profile page coming soon</p>
    return (
      <>
        <div className="container my-5">

          <div>
            <h2>Meet the Team</h2>
            <hr />
          </div>

          <Row className="justify-content-md-center g-5">

            {developers.map(dev => {
              return (
                <Col md={4} className="d-flex flex-column align-items-stretch m-5" key={dev.name.split(' ').join('')}>
                    <Image src={dev.imageSrc} alt="Developer headshot" rounded fluid />
                    <h4>{dev.name}</h4>
                    <span>{dev.title}</span>
                    <p>
                      {dev.description}
                    </p>
                    <div className="fs-3 d-flex justify-content-start">
                      <a className="me-3" href={dev.social[0].link} target="_blank" rel="noreferrer noopenner"><Github /></a>
                      <a className="mx-3" href={dev.social[1].link} target="_blank" rel="noreferrer noopenner"><Linkedin /></a>
                    </div>
                </Col>
              )
            })

            }


          </Row>

        </div >
      </>
    )
  }
};

export default Profile;
