<script>
	let currentDate = new Date().toLocaleDateString();
	import qr from '$lib/assets/images/qr.png';
</script>

<div class="certificate-container">
	<div class="certificate">
		<div class="border"></div>
		<div class="header">
			<div class="title">Certificate of Completion</div>
			<div class="subtitle">This is to certify that</div>
		</div>
		<div class="content">
			<div class="recipient">User</div>
			<div class="course-title">has successfully completed the course</div>
			<div class="course-title">"AI Tutor: Time Management"</div>
			<div class="date">Awarded on: {currentDate}</div>
		</div>
		<div class="footer">
			<div class="signature">Instructor Signature</div>
			<div class="signature">Director Signature</div>
		</div>
		<div class="qr-code">
			<img src={qr} alt="QR CODE" />
		</div>
		<div class="seal"></div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Montserrat:wght@400;700&display=swap');

	:global(body, html) {
		margin: 0;
		padding: 0;
		font-family: 'Montserrat', sans-serif;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
	}

	.certificate-container {
		width: 95%;
		height: 80%;
		padding: 2%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.certificate {
		height: 80%;
		width: 90%; /* Ensures the certificate scales within the container */
		aspect-ratio: 210 / 297; /* Maintain A4 aspect ratio */
		background-color: #ffffff;
		border: 2px solid #c9a959;
		padding: 5%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		background-image: radial-gradient(
				circle at 10% 20%,
				rgba(201, 169, 89, 0.05) 0%,
				transparent 20%
			),
			radial-gradient(circle at 90% 80%, rgba(201, 169, 89, 0.05) 0%, transparent 20%);
	}

	.border {
		position: absolute;
		top: 5%;
		left: 5%;
		right: 5%;
		bottom: 5%;
		border: 2px solid #c9a959;
		pointer-events: none;
	}

	.header {
		text-align: center;
		padding-bottom: 2%;
		padding-top: 2%;
		position: relative;
	}

	.title {
		padding-right: 1rem;
		padding-left: 1rem;
		font-family: 'Cormorant Garamond', serif;
		font-size: 3vw;
		font-weight: bold;
		margin-bottom: 1%;
		color: #2c3e50;
	}

	.subtitle {
		font-size: 1.5vw;
		margin-bottom: 1%;
		color: #34495e;
	}

	.content {
		text-align: center;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: start;
		gap: 2rem;
	}

	.recipient {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2.5vw;
		font-weight: bold;
		margin-bottom: 2%;
		color: #2c3e50;
	}

	.course-title {
		padding-right: 1rem;
		padding-left: 1rem;
		font-size: 2vw;
		margin-bottom: 2%;
		color: #34495e;
	}

	.date {
		font-size: 1.2vw;
		color: #7f8c8d;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		position: absolute;
		bottom: 7%;
		left: 0;
		right: 0;
		gap: 2%;
	}

	.signature {
		border-top: 1px solid #c9a959;
		width: 20%; /* Adjusted width to fit within the layout */
		text-align: center;
		color: #34495e;
		margin: 0 auto; /* Ensures centered alignment for smaller layouts */
	}

	.qr-code {
		width: 10%;
		aspect-ratio: 1;
		/* background-color: #ddd; */
		position: absolute;
		top: 10%;
		right: 10%;
	}

	.seal {
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
		width: 15%;
		aspect-ratio: 1;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='none' stroke='%23c9a959' stroke-width='2'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='8' fill='%23c9a959' text-anchor='middle' dominant-baseline='middle'%3EOFFICIAL SEAL%3C/text%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0.2;
		pointer-events: none;
	}
</style>
