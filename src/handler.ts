export async function handleRequest(request: Request): Promise<Response> {
    const init = {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    };
    return new Response(JSON.stringify({ requestMethod: request.method }), init);
}
