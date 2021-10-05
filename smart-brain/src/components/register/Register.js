import React from "react";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerMail: '',
            registerName: '',
            registerPass: ''
        }
    }


    onMailChoose =(event) =>
    {
        this.setState({registerMail: event.target.value})
    }

    onNameChoose = (event) =>
    {
        this.setState({registerName: event.target.value})
    }

    onPassChoose = (event) =>
    {
        this.setState({registerPass: event.target.value})
    }


    onSubmitForm = () =>
    {
       fetch('http://localhost:3000/register', {
           method: 'post',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
            name: this.state.registerName,
            email: this.state.registerMail,
            password: this.state.registerPass
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data)
            {
                this.props.userData(data);
                this.props.onRouteChange('home')
            } 
        });
    }

    render()
    {
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange= {this.onNameChoose} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange= {this.onMailChoose} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input  onChange= {this.onPassChoose} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"
                        onClick={this.onSubmitForm}                    
                        />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
    
}

export default Register;