//form
import React, { useState } from "react";
import * as yup from "yup";

const formSchema = yup.object().shape({
	name: yup.string().required("Name must be at least two characters."),
	pizzaSize: yup.
});

const Pizza =()=>{

	const [buttonDisabled, setButtonDisabled] = useState(true);

	const [form, setForm] = useState({ 
		name:"", pizzaSize:"", pepperoni:false, mushroom:false, bellpepper:false, instructions:"",});

	const handleChanges = (e) => {
		const order = {	...form, [e.target.name]: e.target.value};
		//validateChange(e);
		setForm(order);
	}

	const submitForm = e => {
		e.preventDefault();
		console.log('submitted');
		setForm({ name:"", pizzaSize:"", toppings:[""], instructions:"" })
	}


	return(
		<>
			<div>
				<h2> Pizza Order Form </h2>

				<form onSubmit={submitForm}>
					{/*name*/}
					<div className="input">
						<label htmlFor="name">Name of the eater or their patron: </label>
						<input type="text" id="name" name="name" placeholder="NAME" value={form.name} onChange={handleChanges}/>
					</div>
					{/*pizzaSize*/}
					<div className="input">
						<label htmlFor="pizzaSize">Pizza Size</label>
						<select id="pizzaSize" name="pizzaSize"  onChange={handleChanges}>
							<option>==Please choose a size==</option>
							<option> Personal (slice) </option>
							<option> Small (2 people) </option>
							<option> Medium (too many people) </option>
							<option> Large (binging anime) </option>
						</select>
					</div>
					{/*toppings*/}
					<div className="inputBoxList">
						<h3>Toppings</h3>
						<ul>
							<li>
								<div className="input">
									<label>Pinapple</label>
									<input type="checkbox" name="pineapple" checked={false/*you may absolutely not put pineapple on your pizza*/} onChange={handleChanges}/>
								</div>
							</li>
							<li>
								<div className="input">
									<label>Mushrooms</label>
									<input type="checkbox" checked={form.mushroom} name="mushroom" onChange={handleChanges}/>
								</div>
							</li>
							<li>
								<div className="input">
									<label>Pepperoni</label>
									<input type="checkbox" checked={form.pepperoni} name="pepperoni" onChange={handleChanges}/>
								</div>								
							</li>
							<li>
								<div className="input">
									<label>Bell Pepper</label>
									<input  type="checkbox" checked={form.bellpepper} name="bellpepper" onChange={handleChanges}/>
								</div>								
							</li>
						</ul>
					</div>
					{/*intrsuctions*/}
					<div className="input">
						<label htmlFor="instructions">Instructions</label>
						<textarea id="instructions" name="instructions" value={form.instructions} onChange={handleChanges}/>
					</div>

					<button type="submit" disabled={buttonDisabled}>Add to order</button>					

				</form>
				
			</div>
		</>
		);
}

export default Pizza;