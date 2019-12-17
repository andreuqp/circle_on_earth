function knowDistance(radius, point, worker) {
    const radiusEarth = 6371; // Radius of the earth in Km

    // *********** EXAMPLE ***********
    // Allowed distance:
    // let radius = 50; // In Km

    // Central Point, construction location (Point)
    // Latitude, Longitude REUS (example)
    // point = [41.153340, 1.097319] #Site inside Reus (Catalonia)

    // Object I want to know the distance to Point.
    // Latitude, Longitude (object, lives inside Barcelona)
    // object = [41.153322, 1.096708] #object inside Barcelona (example) (Catalonia)

    let distance = this.distance(point, worker, radiusEarth);

    let inside = this.workerIsInside(distance, radius);

    var json = {};

    json.result = [];
    json.result.push({
        'isInside': inside,
        'distanceInKmToCentralPoint': distance,
        'latitudeObject': worker[0],
        'longitudeObject': worker[1],
        'latitudePoint': point[0],
        'longitudePoint': point[1]
    });

    return json;
}

// Get the distance of the worker to the point
function distance(point, worker, radiusEarth) {
    let theta1 = degreesToRadians(point[0]);
    let theta2 = degreesToRadians(worker[0]);
    let phi1 = degreesToRadians(point[1]);
    let phi2 = degreesToRadians(worker[1]);

    let haveA = have(theta1, theta2);
    let haveB = have(phi1, phi2);

    return 2 * radiusEarth * Math.asin(Math.sqrt(haveA + Math.cos(theta1) * Math.cos(theta2) * haveB));
}

// We convert angles from degrees to radians
function degreesToRadians(latitudeOrLongitude) {
    return latitudeOrLongitude / 360 * 2 * Math.PI;
}

function have(theta_1, theta_2) {
    return Math.sin((theta_2 - theta_1) / 2) ** 2;
}

// Check if the worker is in the circle
function workerIsInside(distance, radius) {
    if (distance <= radius) {
        return true;
    }
    return false;
}