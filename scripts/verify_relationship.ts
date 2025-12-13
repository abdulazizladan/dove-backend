import { execSync } from 'child_process';

function runCurl(method: string, url: string, data?: any) {
    const dataArg = data ? `-H "Content-Type: application/json" -d '${JSON.stringify(data)}'` : '';
    const cmd = `curl -s -X ${method} "${url}" ${dataArg}`;
    try {
        const output = execSync(cmd).toString();
        return JSON.parse(output);
    } catch (e: any) {
        throw new Error(`Curl failed: ${e.message}`);
    }
}

async function verify() {
    const baseUrl = 'http://127.0.0.1:3000';

    // 1. Create Organization
    console.log('Creating Organization...');
    let orgId = '';
    try {
        const orgData = runCurl('POST', `${baseUrl}/organization`, {
            name: 'Test Organization ' + Date.now(),
            address: 'Test Address'
        });
        if (!orgData.id) throw new Error('No ID returned: ' + JSON.stringify(orgData));
        orgId = orgData.id;
        console.log('Organization Created:', orgId);
    } catch (e: any) {
        console.error('Failed to create organization:', e.message);
        return;
    }

    // 2. Create Department linked to Organization
    console.log('Creating Department...');
    let deptId = '';
    try {
        const deptData = runCurl('POST', `${baseUrl}/departments`, {
            name: 'Test Dept ' + Date.now(),
            organizationId: orgId
        });
        if (!deptData.id) throw new Error('No ID returned: ' + JSON.stringify(deptData));
        deptId = deptData.id;
        console.log('Department Created:', deptId);
    } catch (e: any) {
        console.error('Failed to create department:', e.message);
        return;
    }

    // 3. Verify Relationship (Fetch Organization)
    console.log('Fetching Organization to verify relationship...');
    try {
        const org = runCurl('GET', `${baseUrl}/organization/${orgId}`);
        if (org.departments && Array.isArray(org.departments) && org.departments.some((d: any) => d.id === deptId)) {
            console.log('SUCCESS: Department found in Organization departments list.');
        } else {
            console.error('FAILURE: Department NOT found in Organization departments list.');
            console.log('Departments:', org.departments);
        }
    } catch (e: any) {
        console.error('Failed to fetch organization:', e.message);
    }
}

verify();
