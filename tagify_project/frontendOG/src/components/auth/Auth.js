import React, {Component} from 'react'

class Auth extends Component {

    authHandler = () => {
        console.log('hello there')
        this.props.history.replace( 'https://example.com/callback?code=AQB8C8AvrotjMEp-FlBLkg5r8TSka-StKImM9Ek6Tlj5fKtJYGYsQF-NrgUcFFJiSp4tkGymKgZG4gry4NVaw4RTAaVaxQUX_4e5zM7kNa53xmazQYOUPX3PgOC4QPE9ranOXqg5PBYqMOyIj8w7zSZome2SkHhdui2Hhk9AVaI2NDL3QCbVJq4j5EyMI9C8o9NG&state=sdfshgadsf' );
    }
    render () {
        return (
            <div>
                <h1>AUTH</h1>
                <button onClick={this.authHandler}>auth me</button>
            </div>
        )
    }
}

export default Auth;