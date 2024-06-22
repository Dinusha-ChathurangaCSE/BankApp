import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Parts.css";
import { backend } from "../utilities";

export default function ({ setGlobalUsername }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");

	const navigate = useNavigate();

	return (
		<div className="Auth-form-container">
			<form className="Auth-form-small">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Welcome to A!</h3>

					<div className="form-group mt-3">
						<label>Username</label>
						<input
							type="text"
							className="form-control mt-1"
							placeholder="Enter username"
              value={username}
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
					</div>

					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Enter password"
              value={password}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
					</div>

					<div className="d-grid gap-2 mt-3">
						<button
							formAction="/Customer"
							type="submit"
							className="btn btn-primary"
							onClick={(event) => {
                event.preventDefault();
                backend("/login", {
                  method: "POST",
                  body: {
                    username,
                    password,
										type: "Customer",
									},
                }).then((data) => {
									if (typeof data == "string") {
										setLoginError(data);
										return;
									}
									setGlobalUsername(data.user_name);
									navigate("/Customer");
								});
              }}
						>
							Submit
						</button>
					</div>
					{loginError == "" ? null : <div>{loginError}</div>}

					<div className="d-grid gap-2 mt-3">
						<Link to="/">
						<button
							className="backbutton-small"
							style={{ verticalAlign: "middle" }}
							type="submit"
						>
							<span>Back </span>
						</button>
						</Link>
					</div>

					<p className="forgot-password text-mid mt-3" align="center">
						<a href="/ManualAccount" style={{ color: "black" }}>
							New to this platform? Create an account.
						</a>
					</p>

					<p className="forgot-password text-mid mt-3" align="center">
						<a href="/PasswordResetCustomer" style={{ color: "black" }}>
							Forgot password?
						</a>
					</p>
				</div>
			</form>
		</div>
	);
}
