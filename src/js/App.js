import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import Sidebar from 'grommet/components/Sidebar';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Footer from 'grommet/components/Footer';
import Split from 'grommet/components/Split';
import Map from 'grommet/components/Map';
import Card from 'grommet/components/Card';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import LoginIcon from 'grommet/components/icons/base/Login'
import SVGIcon from 'grommet/components/SVGIcon';
import AddCircleIcon from 'grommet/components/icons/base/AddCircle';
import AddIcon from 'grommet/components/icons/base/Add';
import Button from 'grommet/components/Button'
import LoginForm from 'grommet/components/LoginForm';
import Anchor from 'grommet/components/Anchor';
import Toast from 'grommet/components/Toast';
import FormPreviousLinkIcon from 'grommet/components/icons/base/FormPreviousLink';
import * as firebase from 'firebase'


firebase.initializeApp({
  apiKey: "AIzaSyC2o4AqmsjFAtYWpzp2qhzGwD99_ein2Ik",
  authDomain: "visualizereact.firebaseapp.com",
  databaseURL: "https://visualizereact.firebaseio.com",
  projectId: "visualizereact",
  storageBucket: "visualizereact.appspot.com",
  messagingSenderId: "11669710690"
});


class VisualizeReact extends React.Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);

    this.state = {
      enumRender: 0,
      user: null
    };
  }

  componentDidMount() {
    var userCheck = setInterval(() => this.setState({user:firebase.auth().currentUser}), 500);
  }

  componentWillUnmount() {
    clearInterval(userCheck);
  }

  updateUser(signedInUser) {
    this.setState({user:SignedInUser})
  }
  

  addItem(num) {
    this.setState({enumRender:num});
  };



  render() {
    return(
      <App centered={false}>
        <Split fixed={true} flex='right'>
          <Box>
            <Sidebar colorIndex='neutral-1'>
              <Header pad='medium'
                justify='between'>
                <Title>
                  <ReactLogo/>
                  Visualize React
                </Title>
              </Header>
              <Box flex='grow'
                >
                <Menu primary={true}
                  icon={
                    <Box alignContent='center'
                      justify='between'
                      align='center'
                      alignSelf='center'>
                      <AddCircleIcon size='large'/>
                    </Box>}
                  inline={true}
                >
                  <Button
                    label={<Label text='Project'/>}
                    onClick={() => this.addItem(3)}
                    plain={true}
                    />
                  <Button
                    label={<Label text='Store Provider'/>}
                    onClick={() => this.addItem(1)}
                    plain={true}
                    />
                  <Button
                    label={<Label text='Container'/>}
                    onClick={() => this.addItem(2)}
                    plain={true}
                    />
                  <Button
                    label={<Label text='Component'/>}
                    onClick={() => this.addItem(3)}
                    plain={true}
                    />
                </Menu>
              </Box>
              <FooterUI
                user={this.state.user}>
              </FooterUI>
            </Sidebar>
          </Box>
          <Box colorIndex='grey-2'
            appCentered={true}
            basis='full'
            full={true}
            justify='center'
          >
          <Map data={{
    "categories":[
        {
        "id":"c1",
        "label":"Root",
        "items":[
            {
            "id": "i1",
            "label": "<Test/>",
            "node":<Component/>
            }
        ]
        },
        {
        "id":"c2",
        "label":"Children",
        "items":[
            {
            "id": "i2",
            "label": "<TestChild/>",
            "node":<Component/>
            }
        ]
        }
    ],
    "links": [
        {
        "parentId":"i1",
        "childId":"i2"
        }
    ]
}}
          />
          </Box>
        </Split>
      </App>
    );
  }
}

class FooterUI extends React.Component {
  constructor(props) {
    super(props);
    this.toggleloggingIn = this.toggleloggingIn.bind(this);
    this.renderLoginMenu = this.renderLoginMenu.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.state = {
      loggingIn: false,
      createAccount: false,
    }
  }

  renderLoginMenu() {
    return (
      <div className="logInMenu">
        <Menu
        colorIndex='neutral-1'
          icon={<LoginIcon /> }
        >
          <Button
            plain={true}
            onClick={() => this.toggleloggingIn()}
          >
          Log in
          </Button>
          <Button 
            plain={true}
            onClick={() => this.toggleloggingIn(true)}>
            Create an Account
            </Button>
        </Menu>
      </div>
    )
  }

  renderLogin() {
    return(
      <LogInHandler create={this.state.createAccount}
        back={() =>this.toggleloggingIn()}
      />
    )
  }

  toggleloggingIn(create) {
    this.setState({
      loggingIn: !this.state.loggingIn,
      createAccount: create
    });
  }

  render() {
    if(!this.props.user) {
      return (
        <Footer pad='medium'>
          {this.state.loggingIn ? this.renderLogin(): this.renderLoginMenu()}
        </Footer>
      )
    } else {
      if(this.props.user) {
        return(
        <Footer pad='medium'>
          <Button 
            label='Sign Out'
            onClick={() => firebase.auth().signOut()}
          />
        </Footer>
        )
      }
    }
  }
}


class Component extends React.Component {
  render() {
    return(
      <div className='textColor'>
        <Card
          contentPad='none'
          heading='<Test/>'
          description={<ComponentDetails/>}
        />
      </div>
    ); 
  }
}

class ComponentDetails extends React.Component {
  render() {
    return(
      <Accordion openMulti={true}>
        <AccordionPanel heading='State'>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Paragraph>
        </AccordionPanel>
        <AccordionPanel heading='Props'>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Paragraph>
        </AccordionPanel>
        <AccordionPanel heading='methods'>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Paragraph>
        </AccordionPanel>
      </Accordion>
    );
  }
}



class LogInHandler extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.state =  {
      errorText:'',
      successText:''
    }
  }

  login(credentials) {
    firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password).catch((error) => {
      this.setState({errorText:error.message});
    });
  }

  createAccount(credentials) {
    firebase.auth().createUserWithEmailAndPassword(credentials.username, credentials.password).catch((error) =>{
      this.setState({errorText:error.message});
    });
  }

  clearErrors() {
    this.setState({errorText:''})
  }

  forgotPassword() {
    var emailAddress = "user@example.com";
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
    }, function(error) {
      // An error happened.
    });
    //add functionality and add a view to get the email address for this function.
  }

  render() {
    if(!this.props.create) {
      return (
        <div className='loginHandler'>
          <Button icon={<FormPreviousLinkIcon />}
            onClick={() => this.props.back(false)}
          />
          <LoginForm onSubmit={(credentials) => this.login(credentials)} 
          forgotPassword={<Button
          label='Forgot password?'
          onClick={this.ForgotPassword} />}
          />
          { this.state.errorText !== '' ? <Toast status='critical'
          onClose={() => this.clearErrors()}>
          {this.state.errorText}
          </Toast> : null}
        </div>
      )
    } else {
      if(this.props.create) {
        return (
        <div className='loginHandler'>
          <Button icon={<FormPreviousLinkIcon />}
            onClick={() => this.props.back(false)}
          />
          <LoginForm onSubmit={(credentials) => this.createAccount(credentials)} 
            secondaryText='Press Log In to create an account and log in'
          />
          { this.state.errorText !== '' ? <Toast status='critical'
          onClose={() => this.clearErrors()}>
          {this.state.errorText}
          </Toast> : null}
        </div>
        )
      }
    }
  }
}



class ReactLogo extends React.Component {
  render() {
    const d = `M666.3,296.5c0-32.5-40.7-63.3-103.1-82.4c14.4-63.6,8-114.2-20.2-130.4c-6.5-3.8-14.1-5.6-22.4-5.6v22.3
		c4.6,0,8.3,0.9,11.4,2.6c13.6,7.8,19.5,37.5,14.9,75.7c-1.1,9.4-2.9,19.3-5.1,29.4c-19.6-4.8-41-8.5-63.5-10.9
		c-13.5-18.5-27.5-35.3-41.6-50c32.6-30.3,63.2-46.9,84-46.9l0-22.3c0,0,0,0,0,0c-27.5,0-63.5,19.6-99.9,53.6
		c-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7,0,51.4,16.5,84,46.6c-14,14.7-28,31.4-41.3,49.9c-22.6,2.4-44,6.1-63.6,11
		c-2.3-10-4-19.7-5.2-29c-4.7-38.2,1.1-67.9,14.6-75.8c3-1.8,6.9-2.6,11.5-2.6l0-22.3c0,0,0,0,0,0c-8.4,0-16,1.8-22.6,5.6
		c-28.1,16.2-34.4,66.7-19.9,130.1c-62.2,19.2-102.7,49.9-102.7,82.3c0,32.5,40.7,63.3,103.1,82.4c-14.4,63.6-8,114.2,20.2,130.4
		c6.5,3.8,14.1,5.6,22.5,5.6c27.5,0,63.5-19.6,99.9-53.6c36.4,33.8,72.4,53.2,99.9,53.2c8.4,0,16-1.8,22.6-5.6
		c28.1-16.2,34.4-66.7,19.9-130.1C625.8,359.7,666.3,328.9,666.3,296.5z M536.1,229.8c-3.7,12.9-8.3,26.2-13.5,39.5
		c-4.1-8-8.4-16-13.1-24c-4.6-8-9.5-15.8-14.4-23.4C509.3,224,523,226.6,536.1,229.8z M490.3,336.3c-7.8,13.5-15.8,26.3-24.1,38.2
		c-14.9,1.3-30,2-45.2,2c-15.1,0-30.2-0.7-45-1.9c-8.3-11.9-16.4-24.6-24.2-38c-7.6-13.1-14.5-26.4-20.8-39.8
		c6.2-13.4,13.2-26.8,20.7-39.9c7.8-13.5,15.8-26.3,24.1-38.2c14.9-1.3,30-2,45.2-2c15.1,0,30.2,0.7,45,1.9
		c8.3,11.9,16.4,24.6,24.2,38c7.6,13.1,14.5,26.4,20.8,39.8C504.7,309.8,497.8,323.2,490.3,336.3z M522.6,323.3
		c5.4,13.4,10,26.8,13.8,39.8c-13.1,3.2-26.9,5.9-41.2,8c4.9-7.7,9.8-15.6,14.4-23.7C514.2,339.4,518.5,331.3,522.6,323.3z
		 M421.2,430c-9.3-9.6-18.6-20.3-27.8-32c9,0.4,18.2,0.7,27.5,0.7c9.4,0,18.7-0.2,27.8-0.7C439.7,409.7,430.4,420.4,421.2,430z
		 M346.8,371.1c-14.2-2.1-27.9-4.7-41-7.9c3.7-12.9,8.3-26.2,13.5-39.5c4.1,8,8.4,16,13.1,24C337.1,355.7,341.9,363.5,346.8,371.1z
		 M420.7,163c9.3,9.6,18.6,20.3,27.8,32c-9-0.4-18.2-0.7-27.5-0.7c-9.4,0-18.7,0.2-27.8,0.7C402.2,183.3,411.5,172.6,420.7,163z
		 M346.7,221.9c-4.9,7.7-9.8,15.6-14.4,23.7c-4.6,8-8.9,16-13,24c-5.4-13.4-10-26.8-13.8-39.8C318.6,226.7,332.4,224,346.7,221.9z
		 M256.2,347.1c-35.4-15.1-58.3-34.9-58.3-50.6c0-15.7,22.9-35.6,58.3-50.6c8.6-3.7,18-7,27.7-10.1c5.7,19.6,13.2,40,22.5,60.9
		c-9.2,20.8-16.6,41.1-22.2,60.6C274.3,354.2,264.9,350.8,256.2,347.1z M310,490c-13.6-7.8-19.5-37.5-14.9-75.7
		c1.1-9.4,2.9-19.3,5.1-29.4c19.6,4.8,41,8.5,63.5,10.9c13.5,18.5,27.5,35.3,41.6,50c-32.6,30.3-63.2,46.9-84,46.9
		C316.8,492.6,313,491.7,310,490z M547.2,413.8c4.7,38.2-1.1,67.9-14.6,75.8c-3,1.8-6.9,2.6-11.5,2.6c-20.7,0-51.4-16.5-84-46.6
		c14-14.7,28-31.4,41.3-49.9c22.6-2.4,44-6.1,63.6-11C544.3,394.8,546.1,404.5,547.2,413.8z M585.7,347.1c-8.6,3.7-18,7-27.7,10.1
		c-5.7-19.6-13.2-40-22.5-60.9c9.2-20.8,16.6-41.1,22.2-60.6c9.9,3.1,19.3,6.5,28.1,10.2c35.4,15.1,58.3,34.9,58.3,50.6
		C644,312.2,621.1,332.1,585.7,347.1z`
    return(
      <SVGIcon viewBox='0 0 841.9 595.3'
        version='1.1'
        type='logo'
        a11yTitle='React'>
        <g stroke='#865CD6'
          strokeWidth='4'
          fill='#61DAFB'
          strokeLinejoin='round'>
          <path d={d} />
          <polygon fill="#61DAFB" points="320.8,78.4 320.8,78.4 320.8,78.4 	"/>
	        <circle fill="#61DAFB" cx="420.9" cy="296.5" r="45.7"/>
	        <polygon fill="#61DAFB" points="520.5,78.1 520.5,78.1 520.5,78.1 	"/>
        </g>
      </SVGIcon>
    )
  }
}


class Label extends React.Component {
  render() {
    return (
      <div>
        <AddIcon size='xsmall'/> {this.props.text}
      </div>
    );
  }
}


export default () => (
    <VisualizeReact/>
);
