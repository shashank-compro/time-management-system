# TimeManagementSystem

- COMPONENT FOLDER STRUCTURE:-
		--login
		--dashboard
				--content-page-wrapper
								--leaves
								--timeentry
				--navigation-left
				--navigation-top
		--page-not-found
		--app-component
				
- Guidelines to create a new component:-

	1.  Import _mixins.scss and _variables.scss in component's stylesheet
	Purpose:- To use mixins and variables which are common throughout the project
	
- Guidlines to create a new route:-
	 Do entry of a new route in src\app\app-routing.module.ts
	 For an empty route, the route will be redirected to the login page
	 For a route any other than registered ones, the'PageNotFoundComponent'displays
	 
-  All comon services are to be accessed/saved from common service folder
	Path:- src\app\service




