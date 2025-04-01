export function fetch(input) {
    const { longitude, latitude, countryCode, zip, provinceCode    } = input.deliveryAddress;

    if (!longitude || !latitude || !countryCode || !zip || !provinceCode) {
        return { response: { statusCode: 400, body: 'Invalid input parameters' }};
    }

    // Construct the request for the external API
    const request = buildExternalApiRequest(latitude, longitude, countryCode, zip ,provinceCode);

    return {
        request,
        onResponse(response) {
            if (response.status === 200) {
                return response.json().then((data) => ({
                    response: {
                        statusCode: 200,
                        body: JSON.stringify(data),
                    },
                }));
            }
            return {
                response: {
                    statusCode: response.status,
                    body: `Error: ${response.statusText}`,
                },
            };
        },
        onError(error) {
            return {
                response: {
                    statusCode: 500,
                    body: `Error fetching data: ${error.message}`,
                },
            };
        },
    };
}

function buildExternalApiRequest(latitude, longitude, countryCode, zip , provinceCode) {
    // Construct the API URL with query parameters
    const url = `https://brainboxinfoway.in/castaner/gls/gls-api.php?countryCode=${countryCode}&address=${zip}&provinceCode=${provinceCode}`;

    return {
        method: 'GET',
        url,
        headers: [
            { name: "Accept", value: "application/json; charset=utf-8" }
        ],
        body: null,
        policy: {
            readTimeoutMs: 2000,
        },
    };
}
