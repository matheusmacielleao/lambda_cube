
module.exports.calcVolume = async (event) => {
    let response = {statusCode: 204}
    event = JSON.parse(event.body)
    const cube = {
        width : event.width,
        height : event.height,
        depth : event.depth,
        volume :event.width * event.height * event.depth
    }
    
    response.body = JSON.stringify(cube)
    console.log(response);
    return response;
};