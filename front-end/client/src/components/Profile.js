import React, { useEffect } from 'react'

const Profile = (props) => {
    useEffect(() => {
        props.getUserDetails()
    }, [])
    return (
        <>
            {localStorage.getItem('token') ? (

                <div className="card profile" >

                    <div className="card-body">
                        <h5 className="card-title">{props.userData.name}</h5>
                        <p className="card-text"><strong>Email- </strong> {props.userData.email}
                        </p>
                    </div>
                </div >) : (<div>
                    <h1>401 you are not authenticated</h1>
                </div>)

            }
        </>
    )
}

export default Profile
