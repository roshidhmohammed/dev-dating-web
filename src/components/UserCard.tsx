import type { User } from '../types'

const UserCard = ({user}:User ) => {
    const {firstName, lastName, profilePic, age, gender, about}= user
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={profilePic}
      alt="profile" 
      className='h-80 w-full'/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " "+ lastName}</h2>
       {age && gender && ( <h2 className="card-title">{age + ", "+ gender}</h2>)} 
    <p>{about}</p>
    <div className="card-actions justify-center gap-5">
      <button className="btn btn-primary">Ignore</button>
       <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard