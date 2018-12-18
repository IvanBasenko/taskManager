/**
 * Created by Ivan Basenko on 10.12.2018.
 */

public with sharing class Request {
    private final String DEFAULT_URL = 'https://maps.googleapis.com/';
    private String method;
    private String url;
    private String body;
    private String accessToken = '&key=AIzaSyBOxHmBen0bHHmmP5Zu_QbV9YVl2Kg76LM';

    public Request(String method) {
        this.method = method;
    }

    public HttpResponse execute() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        if (method == 'PATCH') {
            request.setMethod('POST');
            url += '?_HttpMethod=PATCH';
        } else {
            request.setMethod(method);
        }

        request.setEndpoint(url);
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Accept', 'application/json');

        if (String.isNotBlank(body)) {
            request.setBody(body);
        }
        return http.send(request);
    }

    public Request geocodeRequest(String params) {
        this.url = DEFAULT_URL + '/maps/api/geocode/json?address=' + params.replaceAll(' ', '+');
        return this;
    }

    public Request distanceMatrixRequest() {
        this.url = DEFAULT_URL + 'maps/api/distancematrix/json?';
        return this;
    }
    public Request setOrigins(String params) {
        this.url = this.url + 'origins=' + params;
        return this;
    }
    public Request setDestinations(String params) {
        this.url = this.url + '&destinations=' + params;
        return this;
    }
    public Request setDepartureTime() {
        this.url = this.url + '&departure_time=now&mode=driving';
        return this;
    }
    public Request setAccessToken() {
        this.url = url + accessToken;
        return this;
    }
}
