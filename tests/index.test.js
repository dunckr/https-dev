const path = require('path');
const del = require('del');
const fs = require('fs');

const httpsDev = require('..');

const certPath = path.join(__dirname, '../ssl/server.pem');

beforeEach(() => {
	del.sync([certPath], { force: true });
});

describe('httpsDev', () => {
	describe('without any certificates', () => {
		it('creates a new certificate', () => {
			let certExists = fs.existsSync(certPath);
			expect(certExists).toEqual(false);
			httpsDev();
			certExists = fs.existsSync(certPath);
			expect(certExists).toEqual(true);
		});
	});
	describe('with valid certificates', () => {
		it('re-uses the existing certificate', () => {
			httpsDev();
			let certStat = fs.statSync(certPath);
			const { birthtimeMs } = certStat;
			httpsDev();
			certStat = fs.statSync(certPath);
			expect(certStat.birthtimeMs).toEqual(birthtimeMs);
		});
	});
});
