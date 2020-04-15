import {IInputs, IOutputs} from "./generated/ManifestTypes";
import Swal from 'sweetalert2'
//Credit: https://sweetalert2.github.io/



export class CustomAlert implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _successButton: HTMLButtonElement;
	private _errorButton: HTMLButtonElement;
	private _confirmationButton: HTMLButtonElement;
	private _chainingModalButton:HTMLButtonElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Create div element
		this._container = document.createElement("div");	

		//Create buttons
		this._successButton = document.createElement("button");
		this._errorButton = document.createElement("button");
		this._confirmationButton = document.createElement("button");
		this._chainingModalButton = document.createElement("button");

		//add class to div for button group
		this._container.setAttribute("class","btn-toolbar");
		
		//Add class to buttons
		this._successButton.setAttribute("class", "btn btn-success");
		this._errorButton.setAttribute("class", "btn btn-danger");
		this._confirmationButton.setAttribute("class", "btn btn-warning");
		this._chainingModalButton.setAttribute("class","btn btn-primary");

		//add event listener
		this._successButton.addEventListener("click", this.showSucessAlert.bind(this));		
		this._errorButton.addEventListener("click", this.showErrorAlert.bind(this));		
		this._confirmationButton.addEventListener("click", this.showConfirmationAlert.bind(this));		
		this._chainingModalButton.addEventListener("click", this.showChainingAlert.bind(this));		

		//add icons
		this._successButton.innerHTML = "<i class='fa fa-check'></i> Success";
		this._errorButton.innerHTML = "<i class='fa fa-times'></i> Error";
		this._confirmationButton.innerHTML = "<i class='fa fa-exclamation'></i> Confirmation";
		this._chainingModalButton.innerHTML = "<i class='fa fa-list-ol'></i> Multi-Step";

		//Append to parent div
		this._container.appendChild( this._successButton);
		this._container.appendChild( this._errorButton );
		this._container.appendChild( this._confirmationButton );
		this._container.appendChild( this._chainingModalButton );
		container.appendChild( this._container );
	}

	private showSucessAlert(event: Event){
		Swal.fire(
			'Good job!',
			'The record processed successfully!',
			'success'
		  )
	}
	private showErrorAlert(event: Event){
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href>Why do I have this issue?</a>'
		  })
	}
	private showConfirmationAlert(event: Event){
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.value) {
			  Swal.fire(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			  )
			}
		  })
	}
	private showChainingAlert(event: Event){
		Swal.mixin({
			input: 'text',
			confirmButtonText: 'Next &rarr;',
			showCancelButton: true,
			progressSteps: ['1', '2', '3']
		  }).queue([
			{
			  title: 'Question 1',
			  text: 'Chaining swal2 modals is easy'
			},
			'Question 2',
			'Question 3'
		  ]).then((result) => {
			if (result.value) {
			  const answers = JSON.stringify(result.value)
			  Swal.fire({
				title: 'All done!',
				html: `
				  Your answers:
				  <pre><code>${answers}</code></pre>
				`,
				confirmButtonText: 'Lovely!'
			  })
			}
		  })
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}