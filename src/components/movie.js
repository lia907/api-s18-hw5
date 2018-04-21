import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import {submitReview} from "../actions/movieActions";
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

//support routing by creating a new component

class Movie extends Component {

    constructor(props){
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.review = this.review.bind(this);
        this.state = {
            details: {
                review: '',
                rating: ''
            }
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieId));
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    review() {
        const {dispatch} = this.props;
        dispatch(submitReview(this.props.selectedMovie.title, this.state.details));
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.name}</b> {actor.character}
                </p>
            );
        };

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                <b>{review.username}</b> {review.review} &nbsp;&nbsp;
                     <Glyphicon glyph={'star'} />{review.rating}
                </p>
            );
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.imageUrl} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem><h2>{currentMovie.title}</h2></ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.movie_reviews} /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem><MovieReview toReview={currentMovie.title} /></ListGroupItem>
                    </ListGroup>
                </Panel>
            );
        };

        const MovieReview = ({toReview}) => {
            return(
                <Form horizontal>
                    <FormGroup controlId="review">
                        <Col componentClass={ControlLabel} sm={2}>
                            Review
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.updateDetails} value={this.state.details.review} type="text" placeholder="Review" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="rating">
                        <Col componentClass={ControlLabel} sm={2}>
                            Rating
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.updateDetails} value={this.state.details.rating} type="number" placeholder="Rating from 1 to 5" />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.review}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        };

        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        username: state.auth.username,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));