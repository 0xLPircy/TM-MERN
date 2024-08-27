import { useDispatch } from "react-redux";
import { useState } from "react";
import { addGoal } from "../features/goals/goalSlice";


const GoalForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addGoal({text}));
        setText("");
    }
    return (
        <section className="form">
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input 
                        type="text" name="text" id="text" value={text} 
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm