export const simulatingPromise = async (isReject = false) =>
    await new Promise((resolve, reject) => {
        if (isReject) setTimeout(reject, 1000);
        setTimeout(resolve, 1000);
    })
        .then(() => 'toto')
        .catch(() => 'error');
