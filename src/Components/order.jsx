import React,
	{useState,
	useEffect} from "react";
import * as yup from "yup";
import axios from "axios";

	//include in parent as  <Form /> Path:"/pizza"
export default function Form(){
	//schemas
	

	
	const orderSchema = yup.object().shape({
		name: yup.string().required("name requires two characters or more."),
		size: yup.string().required("pizza requires a size."),
		pineapple: yup.boolean(),
		mushrooms: yup.boolean(),
		bellpepper: yup.boolean(),
		garlic: yup.boolean(),
		sundriedTomatoes: yup.boolean(),
		pepperoni: yup.boolean(),
		sausage: yup.boolean(),
		chicken: yup.boolean(),
		instructs: yup.string()
	});
	//state
		 //input
		const [order, setOrder] = useState({ 
			name:"",
			size:"",
			pineapple :false,
			mushrooms:false,
			bellpepper:false,
			garlic:false,
			sundriedTomatoes:false,
			pepperoni:false,
			sausage:false,
			chicken:false,
			instructs:"Special intructions for chefs or driver."});
		 //errors
		 const [errors, setErrors] = useState({ 
		 	name:"",
		 	size:"",
		 	pineapple:"",
		 	mushrooms:"",
		 	bellpepper:"",
		 	garlic:"",
		 	sundriedTomatoes:"",
		 	pepperoni:"",
		 	sausage:"",
		 	chicken:"",
		 	instructs:""});
		 //gate
		 const [buttonDisabled, setButtonDisabled] = useState(false);
		 //post
		 const [post, setPost] = useState([]);
	//helpers
		//changes
			//input
			/*handleChange will access event properties in an asynchronous way*/
			const handleChange = e =>
			{
				e.persist();
				//e.persi will remove the synthetic event from 'the pool' and allow references to the event to be retained.
				const newOrder = { ...order, [e.target.name] : e.target.type === "checkbox" ? e.target.checked : e.target.value};
				//push changed from each input into a new object same shape as the state we want to post - but needs to be done dynamically.
				validateInput(e);
				setOrder(newOrder);
				console.log(
					"Old order state: ", order, 
					"New Order information:", newOrder, 
					"received into order state as: ", order);	
				//definately not the results I was expecting, uh, TODO: review hoisting, and synthetic events, and vanilla state in react.
			};
			//submit
			/*submit the now altered object 'order' either as a new object in an array to be sent later or by itself; post to reqres.in/api/users*/
			const submitPost = (e) => {
				e.preventDefault();
				axios
					.post("https://reqres.in/api/users", order)
					.then(
						(res) =>{
							setPost(res.data);
							setOrder({ 
								name:"",
								size:"",
								pineapple:false,
								mushrooms:false,
								bellpepper:false,
								garlic:false,
								sundriedTomatoes:false,
								pepperoni:false,
								sausage:false,
								chicken:false,
								instructs:"Special intructions for chefs or driver."});
							console.log(res.data, " has been inserted into ", post, " and succesfully been posted and returned.");
						})
			};
			//validate
				//validate changes as they happen
				const validateInput = (e) => {
					yup
						.reach(orderSchema, e.target.name)
						.validate(e.target.name === e.target.value)
						.then( valid => { setErrors({...errors, [e.target.name]: ""})})
						.catch( err => { setErrors({ ...errors, [e.target.name]: err.errors[0]})});
						console.log(errors)};
				//gatekeep the submission post until all information trying to pass is validate (ideally this would at some point contain that data, validate it and then transpose it into plain text.)
				useEffect ( 
					()=>{
						orderSchema.isValid(order).then((isValid) => {
							setButtonDisabled(!isValid);
						});
					},[order]
				);


	//render
	return (
			<div>
				<form onSubmit={submitPost}>
					<div className="input">
						<label htmlFor="name">Name: </label>
						<input data-cy="name" type="text" id="name" name="name" placeholder="name" onChange={handleChange} value={order.name} />
					</div>
					<div>
						<label htmlFor="size"></label>
						<select  data-cy="size" id="size" name="size" onChange={handleChange }> 
							<option>==choose size==</option>
							<option>small</option>
							<option>medium</option>
							<option>large</option>
						</select>						
					</div>
					<div className="toppings">
						<ul>	
							<li>	
								<div>
									<label htmlFor="pinapple">Pineapple</label>
									<input  data-cy="pineapple" type="checkbox" id="pineapple" name="pineapple" value={order.pinapple} onChange={handleChange} />
								</div>
							</li>
							<li>	
								<div>
									<label htmlFor="mushrooms">mushrooms:</label>
									<input  data-cy="mushrooms" type="checkbox" id="mushrooms" name="mushrooms" value={order.mushrooms} onChange={handleChange} />
								</div>
							</li>
							<li>	
								<div>
									<label htmlFor="">bellpepper:</label>
									<input  data-cy="bellpepper" type="checkbox" id="bellpepper" name="bellpepper" value={order.bellpepper} onChange={handleChange} />
								</div>
							</li>
							<li>	
								<div>
									<label htmlFor="">roasted garlic:</label>
									<input  data-cy="garlic" type="checkbox" id="garlic" name="garlic" value={order.garlic} onChange={handleChange} />
								</div>
							</li>
							<li>	
								<div>
									<label htmlFor="">sundried-tomatoes:</label>
									<input  data-cy="sundriedTomatoes" type="checkbox" id="sundriedTomatoes" name="sundriedTomatoes" value={order.sundriedTomatoes} onChange={handleChange} />
								</div>
							</li>
							<li>	
								<div>
									<label htmlFor="">pepperoni:</label>
									<input  data-cy="pepperoni" type="checkbox" id="pepperoni" name="pepperoni" value={order.pepperoni} onChange={handleChange} />
								</div>
							</li>
							<li>	
								<div>
									<label htmlFor="">sausage:</label>
									<input  data-cy="sausage" type="checkbox" id="sausage" name="sausage" value={order.sausage} onChange={handleChange} />
								</div>
							</li>
							<li>	
								<div>
									<label htmlFor="">chicken:</label>
									<input  data-cy="chicken" type="checkbox" id="chicken" name="chicken" value={order.chicken} onChange={handleChange} />
								</div>
							</li>
						</ul>					
					</div>
					<div>
						<label htmlFor="instructs">special instructions:</label>
						<textarea  data-cy="instructions" id="instructs" onChange={handleChange} />
					</div>
					{console.log("new Order State: ", order)}
					<button  data-cy="submit" disabled={buttonDisabled} type="submit">Add to Order</button>
					<div className="postit">
						<pre>post and return request: {JSON.stringify(post,null,2)}</pre>
					</div>
				</form>
			</div>
		);
};