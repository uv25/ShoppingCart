import React from "react";
import { View, Text } from 'react-native'
import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
  } from 'react-native-fbsdk';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userInfo: null
        }
    }

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id, name,  first_name, last_name',
          },
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, result) => {
            if (error) {
              //console.log('login info has error: ' + error);
            } else {
              this.setState({userInfo: result});
              //console.log('result:', result);
            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
      };

    render() {
        return(
            <View style={{flex: 1, margin: 50}}>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              //console.log('login has error: ' + result.error);
              this.props.navigation.navigate('Products')
            } else if (result.isCancelled) {
              //console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                this.getInfoFromToken(accessToken);
                //console.log("login success")
                this.props.navigation.navigate('Products')
              }).catch((error) => {
                  //console.log("error")
              });
            }
          }}
          onLogoutFinished={() => this.setState({userInfo: {}})}
        />
        {this.state.userInfo?.name && (
          <Text style={{fontSize: 16, marginVertical: 16}}>
            Logged in As {this.state.userInfo.name}
          </Text>
        )}
      </View>
        )
    }
}

export default Login