import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import { api } from '../../config/Services';
import { GetRequest } from '../../services/RequestService';

class Layout extends Component {
	constructor(props) {
        super(props);
        this.state = {
            userList : [],
            isLoaded : false
        };
    }
	
	getUserList() {
        let url = api.url.users.list;
        var result = GetRequest(url);
        result.then((response) => {
            this.setState({
                userList: response,
                isLoaded: true
            });
        });
    }
	
	componentDidMount() {
		document.title = 'User List';
		this.getUserList();
	}
	
	render() {
		const { userList, isLoaded } = this.state;
		var number = 1;
		var body = '';
		if (!isLoaded) {
            body = <tbody>
                <tr>
                    <td colSpan="99" className="text-center">Loading . . .</td>
                </tr>
            </tbody>;
        } else {
            if (userList.length) {
                body = <tbody>
                    {userList.map((val, i) =>
                        <tr key={i}>
                            <td className="text-center">{ number++ }</td>
                            <td>{val.username}</td>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td className="text-center">
                            	<Link to={'/home/user/id/' + val.id} title="User detail" className="btn btn-outline-info btn-sm">Detail</Link>
                            </td>
                        </tr>
                    )}
                </tbody>;
            } else {
                body = <tbody>
                    <tr>
                        <td colSpan="99" className="text-center">No data to display</td>
                    </tr>
                </tbody>;
            }
        }
		return(
			<React.Fragment>
				<Row className="col">
					<Col xs lg="12">
						<h3 className="mt-3">User List</h3>
					</Col>
				</Row>
				<hr/>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th className="text-center">#</th>
							<th>Username</th>
							<th>Name</th>
							<th>Email</th>
							<th></th>
						</tr>
					</thead>
					{ body }
				</Table>
			</React.Fragment>
        )
	}
}

export default Layout;
