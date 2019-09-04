# TimeManagementSystem

## - Component folder structure:-
```bash
        --app-component
        --login
		--dashboard
				--content-page-wrapper
							--leaves
							--timeentry
				--navigation-left
				--navigation-top
		--page-not-found
```
	       
				
## - Component Guideline

  Import _mixins.scss and _variables.scss in component's stylesheet
	
   Purpose:- To use mixins and variables which are common throughout the project
## - Routing Guidelines
	
- Perform entry of a new route in src\app\app-routing.module.ts
- For an empty route, the route will be redirected to /login by default
- For a route any other than registered ones, the PageNotFoundComponent' displays
	
## - Service Guideline 
-  All comon services are to be accessed/saved to common service folder
	Path:- src\app\service




