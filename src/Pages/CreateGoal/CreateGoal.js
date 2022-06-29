import {Button, Notification} from "../../Components";
import {GoPlus} from 'react-icons/go';
import {useState} from "react";
import * as goalService from "../../Services/GoalService";
import {useAuthContext} from "../../Contexts/AuthContext";
import {useStateContext} from "../../Contexts/ContextProvider";

function CreateGoal(){
    const {user} = useAuthContext();
    const {updateAllGoals} = useStateContext();
    const [alert, setAlert] = useState(undefined);

    const createGoal = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const {title, description, category, due_date} = Object.fromEntries(formData);

        const data = {
            title,
            description,
            category,
            due_date,
            user_id: user.user_id
        }
        if (!alert) {
            let response = goalService.createGoal(data);
            response
                .then(res => {
                    setAlert(<Notification type={'Success'} text={res.message} />);
                    updateAllGoals({user_id: user.user_id});
                })
                .catch(err => {
                    setAlert(<Notification type={'Error'} text={err.response.data.message}/>);
                })
        }
        setTimeout(() => {
            setAlert(undefined);
        }, 3000);

    }

    return(
        <div className={'flex justify-center my-16'}>

            <div id="message" className="text-center absolute">{alert}</div>

            <form method="post"
                  className={'bg-main-bg w-4/5 md:w-3/4 py-10 px-8 drop-shadow-2xl rounded-lg border'}
                  onSubmit={createGoal}>

                <h1 className="text-center mb-10 text-blue text-3xl font-bold">Create New Goal</h1>

                <div className="grid gap-4 grid-cols-1">
                    <input type="text"
                           name={'title'}
                           className="w-full px-3 py-2 border border-slate-400 rounded-lg"
                           placeholder={'Goal title...'}
                           required/>

                    <textarea rows={'10'}
                              name="description"
                              defaultValue="Goal description...."
                              className={'p-3'}
                    />

                </div>
                <div className="grid gap-4 grid-cols-2 mt-10">

                    <select name="category"
                            className={'w-full px-3 py-2 border border-slate-400 rounded-lg'}>
                        <option value="1">Personal</option>
                        <option value="2">Financial</option>
                        <option value="3">Other</option>
                    </select>

                    <input type="date"
                           name={'due_date'}
                           className={'w-full px-3 py-2 border border-slate-400 rounded-lg'}
                           required />

                </div>

                <div className="mt-8">
                    <Button primaryBtn={true} icon={<GoPlus />} text={'Create Goal'} />
                </div>
            </form>
        </div>
    )
}
export default CreateGoal;