/*
    update user
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Col, Form, Modal, Button, Card, Jumbotron } from 'react-bootstrap';
import { api } from '../../config/Services';
import { GetRequest } from '../../services/RequestService';
import ErrorPage from '../error/Error404';

class Layout extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	id              : '',
        	username        : '',
        	name            : '',
        	email           : '',
        	phone           : '',
        	website         : '',
        	postList        : [],
        	isPostLoaded    : false,
        	albumList       : [],
        	isAlbumLoaded   : false,
        	albumShow       : false,
        	albumTitle      : '',
        	photoList       : [],
        	isPhotoLoaded   : false,
        	postShow        : false,
        	postTitle       : '',
        	postBody       : '',
        	commentList     : [],
        	isCommentLoaded : false
        };
        this.handleAlbumShow = this.handleAlbumShow.bind(this);
        this.handleAlbumClose = this.handleAlbumClose.bind(this);
        this.handlePostShow = this.handlePostShow.bind(this);
        this.handlePostClose = this.handlePostClose.bind(this);
    }
	
	handleAlbumClose() {
		this.setState({ photoList : [], albumShow: false, albumTitle: '', isPhotoLoaded: false });
	}
	
	handleAlbumShow(e, id, title) {
		this.setState({
			albumShow: true,
			albumTitle: title
        }, () => {
        	this.getPhotoList(id);
        });
	}
	
	handlePostClose() {
		this.setState({ commentList : [], postShow: false, postTitle: '', postBody: '', isCommentLoaded: false });
	}
	
	handlePostShow(e, id, title, body) {
		this.setState({
			postShow: true,
			postTitle: title,
			postBody: body
        }, () => {
        	this.getCommentList(id);
        });
	}
	
	getUserDetail(id) {
        let url = api.url.users.list+'/'+id;
        var result = GetRequest(url);
        result.then((response) => {
        	var username = '';
        	var name     = '';
        	var email    = '';
        	var phone    = '';
        	var website  = '';
        	if(response.id) {
        		username = response.username;
            	name     = response.name;
            	email    = response.email;
            	phone    = response.phone;
            	website  = response.website;
	        } else {
	        	username = name = email = phone = website = '-';
	        }
        	
            this.setState({
            	username, name, email, phone, website
            }, () => {
            	this.getPostList(id);
            	this.getAlbumList(id);
            });
        });
    }
	
	getPostList(id) {
        let url = api.url.posts.list+'?userId='+id;
        var result = GetRequest(url);
        result.then((response) => {
            this.setState({
            	postList     : response,
            	isPostLoaded : true
            });
        });
    }
	
	getAlbumList(id) {
        let url = api.url.albums.list+'?userId='+id;
        var result = GetRequest(url);
        result.then((response) => {
            this.setState({
            	albumList     : response,
            	isAlbumLoaded : true
            });
        });
    }
	
	getPhotoList(id) {
        let url = api.url.photos.list+'?albumId='+id;
        var result = GetRequest(url);
        result.then((response) => {
            this.setState({
            	photoList     : response,
            	isPhotoLoaded : true
            });
        });
    }
	
	getCommentList(id) {
        let url = api.url.comments.list+'?postId='+id;
        var result = GetRequest(url);
        result.then((response) => {
        	console.log(response);
            this.setState({
            	commentList     : response,
            	isCommentLoaded : true
            });
        });
    }
	
	componentDidMount() {
		document.title = 'User Detail';
		let id = this.props.param.id;
		if (id) {
			this.setState({ id });
			this.getUserDetail(id);
		} else {
			return <ErrorPage />
		}
	}
	
	render() {
		const { id, username, name, email, phone, website, postList, isPostLoaded, albumList, isAlbumLoaded, albumTitle, photoList, isPhotoLoaded, postTitle, postBody, commentList, isCommentLoaded } = this.state;
		if (id) {
			var numberAPost = 1;
			var numberAlbum = 1;
			var bodyPost = '';
			var bodyAlbum = '';
			var bodyPhoto = '';
			var bodyComment = '';
			
			if (!isPostLoaded) {
				bodyPost = <tbody>
	                <tr>
	                    <td colSpan="99" className="text-center">Loading . . .</td>
	                </tr>
	            </tbody>;
	        } else {
	            if (postList.length) {
	            	bodyPost = <tbody>
	                    {postList.map((val, i) =>
	                        <tr key={ i }>
	                            <td className="text-center">{ numberAPost++ }</td>
	                            <td>{ val.title }</td>
	                            <td className="text-center">
	                            	<Button variant="outline-info" size="sm" onClick={(e) => this.handlePostShow(e, val.id, val.title, val.body)} >View</Button>
	                            </td>
	                        </tr>
	                    )}
	                </tbody>;
	            } else {
	            	bodyPost = <tbody>
	                    <tr>
	                        <td colSpan="99" className="text-center">No data to display</td>
	                    </tr>
	                </tbody>;
	            }
	        }
			
			if (!isAlbumLoaded) {
				bodyAlbum = <tbody>
	                <tr>
	                    <td colSpan="99" className="text-center">Loading . . .</td>
	                </tr>
	            </tbody>;
	        } else {
	            if (albumList.length) {
	            	bodyAlbum = <tbody>
	                    {albumList.map((val, i) =>
	                        <tr key={ i }>
	                            <td className="text-center">{ numberAlbum++ }</td>
	                            <td>{ val.title }</td>
	                            <td className="text-center">
	                            	<Button variant="outline-info" size="sm" onClick={(e) => this.handleAlbumShow(e, val.id, val.title)} >View</Button>
	                            </td>
	                        </tr>
	                    )}
	                </tbody>;
	            } else {
	            	bodyAlbum = <tbody>
	                    <tr>
	                        <td colSpan="99" className="text-center">No data to display</td>
	                    </tr>
	                </tbody>;
	            }
	        }
			
			if (!isPhotoLoaded) {
				bodyPhoto = <div className="text-center">Loading . . .</div>;
	        } else {
	            if (photoList.length) {
	            	bodyPhoto = <Row>
	                    {photoList.map((val, i) =>
	                    	<Col key={ i } md="4" lg="3">
		                    	<Card key={i}>
		                    	  <Card.Img variant="top" src={ val.thumbnailUrl } />
		                    	  <Card.Body>
		                    	    <Card.Text><small>{ val.title }</small></Card.Text>
		                    	  </Card.Body>
		                    	</Card>
	                    	</Col>
	                    )}
	                </Row>;
	            } else {
	            	bodyPhoto = <div className="text-center">No data to display</div>;
	            }
	        }
			
			if (!isCommentLoaded) {
				bodyComment = <div className="text-center">Loading . . .</div>;
	        } else {
	            if (commentList.length) {
	            	bodyComment = <Row>
	                    {commentList.map((val, i) =>
	                    	<Col key={ i } sm="12" className="mb-2">
		                    	<Card key={i}>
		                    	  <Card.Body>
		                    	  	<Card.Title>{ val.name }</Card.Title>
		                    	  	<Card.Subtitle className="mb-2 text-muted">{ val.email }</Card.Subtitle>
		                    	    <Card.Text>{ val.body }</Card.Text>
		                    	  </Card.Body>
		                    	</Card>
	                    	</Col>
	                    )}
	                </Row>;
	            } else {
	            	bodyComment = <div className="text-center">No data to display</div>;
	            }
	        }
			
			return(
				<React.Fragment>
					<Row>
						<Col xs lg="10">
							<h3 className="mt-3">User : { username }</h3>
						</Col>
						<Col xs lg="2" className="text-right">
							<Link to="/home" className="btn btn-outline-info btn-sm pull-right mt-3">Back</Link>
						</Col>
					</Row>
					<hr/>
					<Form>
						<Row>
							<Col md="6">
								<Form.Group as={Row}>
									<Form.Label column sm="4">Name</Form.Label>
									<Col sm="8">
										<Form.Control plaintext readOnly defaultValue={ name } />
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm="4">Email</Form.Label>
									<Col sm="8">
										<Form.Control plaintext readOnly defaultValue={ email } />
									</Col>
								</Form.Group>
							</Col>
							<Col md="6">
								<Form.Group as={Row}>
									<Form.Label column sm="4">Phone</Form.Label>
									<Col sm="8">
										<Form.Control plaintext readOnly defaultValue={ phone } />
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Form.Label column sm="4">Website</Form.Label>
									<Col sm="8">
										<Form.Control plaintext readOnly defaultValue={ website } />
									</Col>
								</Form.Group>
							</Col>
						</Row>
						<hr className="col"/>
						<Row>
							<Col md="6">
								<h5 className="mt-3">Post List</h5>
								<Table striped bordered hover size="sm">
								<thead>
									<tr>
										<th className="text-center">#</th>
										<th>Title</th>
										<th></th>
									</tr>
								</thead>
								{ bodyPost }
							</Table>
							</Col>
							<Col md="6">
								<h5 className="mt-3">Album List</h5>
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th className="text-center">#</th>
											<th>Title</th>
											<th></th>
										</tr>
									</thead>
									{ bodyAlbum }
								</Table>
							</Col>
						</Row>
					</Form>
					<Modal show={ this.state.albumShow } onHide={ this.handleAlbumClose } dialogClassName="modal-90w" >
						<Modal.Header closeButton>
							<Modal.Title>{ albumTitle }</Modal.Title>
						</Modal.Header>
						<Modal.Body>{ bodyPhoto }</Modal.Body>
					</Modal>
					<Modal show={ this.state.postShow } onHide={ this.handlePostClose } dialogClassName="modal-90w" >
						<Modal.Header closeButton>
							<Modal.Title>{ postTitle }</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Jumbotron>{ postBody }</Jumbotron>
							<hr/>
							{ bodyComment }
						</Modal.Body>
					</Modal>
				</React.Fragment>
	        )
		} else {
			return (<ErrorPage />);
		}
	}
}

export default Layout;
