import { ApiClient, ThingsV2Api } from '@arduino/arduino-iot-client';
var defaultClient = ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaTIuYXJkdWluby5jYy9pb3QiLCJhenAiOiJpbm92UDRqQkluWEo3TTBhRGV2eFJpcUFIZ0xyRmRBaCIsImV4cCI6MTY5MDQ0MjI5OCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiaHR0cDovL2FyZHVpbm8uY2MvY2xpZW50X2lkIjoidGVzdGFwaSIsImh0dHA6Ly9hcmR1aW5vLmNjL2lkIjoiNTcxZjZkNzYtOWM2Ni00ZWZiLTkzY2QtMjI4ZTVjMzUwZTBlIiwiaHR0cDovL2FyZHVpbm8uY2MvcmF0ZWxpbWl0IjoxMCwiaHR0cDovL2FyZHVpbm8uY2MvdXNlcm5hbWUiOiJhYmR1bGthcmltMjAyMyIsImlhdCI6MTY5MDQ0MTk5OCwic3ViIjoiaW5vdlA0akJJblhKN00wYURldnhSaXFBSGdMckZkQWhAY2xpZW50cyJ9.yACenM48ylMa7Q5D-ZW2nc8RezlZRXTtbOp5f6XcKos";


var api = new ThingsV2Api()
var id = '779162e6-c38e-4231-a85d-03b0d7e19392'; // {String} The id of the thing
var opts = {
  'showDeleted': true, // {Boolean} If true, shows the soft deleted thing
};
api.thingsV2Show(id, opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});