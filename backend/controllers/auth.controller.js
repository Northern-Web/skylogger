const stytch = require('stytch');
const { ironSession } = require('iron-session');

const client = new stytch.Client({
    project_id: process.env.STYTCH_PID,
    secret: process.env.STYTCH_SECRET,
    env: process.env.STYTCH_ENV === 'test'
      ? stytch.envs.test
      : stytch.envs.live
  });

exports.authentication = async (req, res) => {
    const { token } = req.query;

    try {
        const response = await client.oauth.authenticate(token, {
            session_management_type: 'stytch',
            session_duration_minutes: 5
        });

        console.log(response);
        const session_token = response.session.stytch_session.session_token;
        res.redirect(`http://localhost:8080?session_token=${session_token}`);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Authentication Error",
            error: err.message
        });
    }
}

exports.verifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        await client.sessions.authenticate({session_token: token});
        res.status(200).json({
            success: true,
            message: "Session Verified"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Authentication Error",
            error: err.message
        });
    }
}

exports.getUserDetails = async (req, res) => {
    const { token } = req.query;

    try {
        await client.sessions.authenticate({session_token: token});

        const user = await client.users.get(token);
        console.log(user);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Error fetching user details.",
            error: err
        });
        console.log(err);
    }
}