const markerList = [
    // Panel 1
    'DYS393', 'DYS390', 'DYS19', 'DYS391', 'DYS385', 'DYS426', 'DYS388', 
    'DYS439', 'DYS389I', 'DYS392', 'DYS389II',
    // Panel 2 (12-37)
    'DYS458', 'DYS459', 'DYS455', 'DYS454', 'DYS447', 'DYS437', 'DYS448', 
    'DYS449', 'DYS464', 'DYS460', 'Y-GATA-H4', 'YCAII', 'DYS456', 'DYS607', 
    'DYS576', 'DYS570', 'CDY', 'DYS442', 'DYS438', 'DYS531', 'DYS578', 
    'DYF395S1', 'DYS590', 'DYS537', 'DYS641', 'DYS472',
    // Panel 3 (38-111)
    'DYF406S1', 'DYS511', 'DYS425', 'DYS413', 'DYS557', 'DYS594', 'DYS436', 
    'DYS490', 'DYS534', 'DYS450', 'DYS444', 'DYS481', 'DYS520', 'DYS446', 
    'DYS617', 'DYS568', 'DYS487', 'DYS572', 'DYS640', 'DYS492', 'DYS565', 
    'DYS710', 'DYS485', 'DYS632', 'DYS495', 'DYS540', 'DYS714', 'DYS716', 
    'DYS717', 'DYS505', 'DYS556', 'DYS549', 'DYS589', 'DYS522', 'DYS494', 
    'DYS533', 'DYS636', 'DYS575', 'DYS638', 'DYS462', 'DYS452', 'DYS445',
    'Y-GATA-A10', 'DYS463', 'DYF441', 'Y-GGAAT-1B07', 'DYS525', 'DYS712', 
    'DYS593', 'DYS650', 'DYS532', 'DYS715', 'DYS504', 'DYS513', 'DYS561', 
    'DYS552', 'DYS726', 'DYS635', 'DYS587', 'DYS643', 'DYS497', 'DYS510', 
    'DYS434', 'DYS461', 'DYS435'
];

function createInputFields(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    let currentPanel = 0;
    markerList.forEach((marker, index) => {
        const panel = Math.floor(index / 37) + 1;
        if (panel !== currentPanel) {
            currentPanel = panel;
            const header = document.createElement('div');
            header.className = 'panel-header';
            header.textContent = `Panel ${panel}`;
            container.appendChild(header);
        }

        const div = document.createElement('div');
        div.className = 'str-input';
        
        const label = document.createElement('label');
        label.textContent = `${index + 1}. ${marker}`;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `${containerId}-${index}`;
        
        div.appendChild(label);
        div.appendChild(input);
        container.appendChild(div);
    });
}

function fillFromPaste(textareaId, inputContainerId) {
    const pasteContent = document.getElementById(textareaId).value;
    const values = pasteContent.trim().split(/[\t\s]+/);
    
    const inputs = Array.from(document.getElementById(inputContainerId).getElementsByTagName('input'));
    
    // First, clear all input fields
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Then fill only the new values
    values.forEach((value, index) => {
        if (index < inputs.length) {
            inputs[index].value = value;
        }
    });
}


function compareSTRs() {
    const results = document.getElementById('results');
    let comparisonHTML = '<div class="space-y-4">';
    
    // Define marker ranges for each panel
    const panelRanges = {
        panel12: ['DYS393', 'DYS390', 'DYS19', 'DYS391', 'DYS385', 'DYS426', 'DYS388', 
                 'DYS439', 'DYS389I', 'DYS392', 'DYS389II'],
        panel25: ['DYS458', 'DYS459', 'DYS455', 'DYS454', 'DYS447', 'DYS437', 'DYS448', 
                         'DYS449', 'DYS464'],
        panel37: ['DYS460', 'Y-GATA-H4', 'YCAII', 'DYS456', 'DYS607', 'DYS576', 'DYS570', 
                         'CDY', 'DYS442', 'DYS438'],
        panel67: ['DYS531', 'DYS578', 'DYF395S1', 'DYS590', 'DYS537', 'DYS641', 'DYS472', 
                         'DYF406S1', 'DYS511', 'DYS425', 'DYS413', 'DYS557', 'DYS594', 'DYS436', 
                         'DYS490', 'DYS534', 'DYS450', 'DYS444', 'DYS481', 'DYS520', 'DYS446', 
                         'DYS617', 'DYS568', 'DYS487', 'DYS572', 'DYS640', 'DYS492', 'DYS565'],
        panel111: ['DYS710', 'DYS485', 'DYS632', 'DYS495', 'DYS540', 'DYS714', 'DYS716', 
                          'DYS717', 'DYS505', 'DYS556', 'DYS549', 'DYS589', 'DYS522', 'DYS494', 
                          'DYS533', 'DYS636', 'DYS575', 'DYS638', 'DYS462', 'DYS452', 'DYS445', 
                          'Y-GATA-A10', 'DYS463', 'DYS441', 'Y-GGAAT-1B07', 'DYS525', 'DYS712', 
                          'DYS593', 'DYS650', 'DYS532', 'DYS715', 'DYS504', 'DYS513', 'DYS561', 
                          'DYS552', 'DYS726', 'DYS635', 'DYS587', 'DYS643', 'DYS497', 'DYS510', 
                          'DYS434', 'DYS461', 'DYS435']
    };
    
    let matches = 0;
    let mismatches = 0;
    let missing = 0;
    
    // Initialize panel counters
    let panel12 = { matches: 0, mismatches: 0, missing: 0 };
    let panel25 = { matches: 0, mismatches: 0, missing: 0 };
    let panel37 = { matches: 0, mismatches: 0, missing: 0 };
    let panel67 = { matches: 0, mismatches: 0, missing: 0 };
    let panel111 = { matches: 0, mismatches: 0, missing: 0 };
    
    markerList.forEach((marker, index) => {
        const firstValue = document.getElementById(`firstSetInputs-${index}`).value.trim();
        const secondValue = document.getElementById(`secondSetInputs-${index}`).value.trim();
        
        // Function to check if a value is all zeros when split by hyphen
        const isAllZeros = (value) => {
            if (value.includes('-')) {
                return value.split('-').every(part => !part || part === '0');
            }
            return !value || value === '0';
        };
        
        // Check if either value is '0' or empty, handling multi-value markers
        const isFirstValueMissing = isAllZeros(firstValue);
        const isSecondValueMissing = isAllZeros(secondValue);
        
        // Update panel counters based on marker name
        const updatePanelCounters = (type) => {
            if (panelRanges.panel12.includes(marker)) {
                panel12[type]++;
                panel25[type]++;
                panel37[type]++;
                panel67[type]++;
                panel111[type]++;
            } else if (panelRanges.panel25.includes(marker)) {
                panel25[type]++;
                panel37[type]++;
                panel67[type]++;
                panel111[type]++;
            } else if (panelRanges.panel37.includes(marker)) {
                panel37[type]++;
                panel67[type]++;
                panel111[type]++;
            } else if (panelRanges.panel67.includes(marker)) {
                panel67[type]++;
                panel111[type]++;
            } else if (panelRanges.panel111.includes(marker)) {
                panel111[type]++;
            }
        };
        
        if (isFirstValueMissing && isSecondValueMissing) {
            missing++;
            updatePanelCounters('missing');
            comparisonHTML += `<div class="missing">${marker}: Both values missing</div>`;
        } else if (isFirstValueMissing || isSecondValueMissing) {
            missing++;
            updatePanelCounters('missing');
            const firstDisplay = isFirstValueMissing ? 'missing' : firstValue;
            const secondDisplay = isSecondValueMissing ? 'missing' : secondValue;
            comparisonHTML += `<div class="missing">${marker}: One value missing (Set 1: ${firstDisplay}, Set 2: ${secondDisplay})</div>`;
        } else if (firstValue === secondValue) {
            matches++;
            updatePanelCounters('matches');
            comparisonHTML += `<div class="match">${marker}: Match (${firstValue})</div>`;
        } else {
            mismatches++;
            updatePanelCounters('mismatches');
            comparisonHTML += `<div class="mismatch">${marker}: Mismatch (Set 1: ${firstValue}, Set 2: ${secondValue})</div>`;
        }
    });


    const summary = `
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Comparison Summary</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg border border-emerald-200">
                    <h4 class="font-semibold text-emerald-700 mb-3">Total Overview</h4>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-center">
                            <div class="text-lg font-semibold text-green-600">${matches}</div>
                            <div class="text-sm text-gray-600">Matches</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-semibold text-red-600">${mismatches}</div>
                            <div class="text-sm text-gray-600">Mismatches</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-semibold text-yellow-600">${missing}</div>
                            <div class="text-sm text-gray-600">Missing</div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-4 rounded-lg border border-emerald-200">
                    <h4 class="font-semibold text-emerald-700 mb-3">FTDNA Panel Match Rates</h4>
                    <div class="space-y-3">
                        <div class="p-2 bg-gray-50 rounded">
                            <div class="text-sm font-semibold text-gray-700">12 Marker Panel</div>
                            <div class="grid grid-cols-3 gap-2 mt-1">
                                <div class="text-sm text-green-600">Match: ${panel12.matches}</div>
                                <div class="text-sm text-red-600">Mismatch: ${panel12.mismatches}</div>
                                <div class="text-sm text-yellow-600">Missing: ${panel12.missing}</div>
                            </div>
                        </div>
                        <div class="p-2 bg-gray-50 rounded">
                            <div class="text-sm font-semibold text-gray-700">25 Marker Panel</div>
                            <div class="grid grid-cols-3 gap-2 mt-1">
                                <div class="text-sm text-green-600">Match: ${panel25.matches}</div>
                                <div class="text-sm text-red-600">Mismatch: ${panel25.mismatches}</div>
                                <div class="text-sm text-yellow-600">Missing: ${panel25.missing}</div>
                            </div>
                        </div>
                        <div class="p-2 bg-gray-50 rounded">
                            <div class="text-sm font-semibold text-gray-700">37 Marker Panel</div>
                            <div class="grid grid-cols-3 gap-2 mt-1">
                                <div class="text-sm text-green-600">Match: ${panel37.matches}</div>
                                <div class="text-sm text-red-600">Mismatch: ${panel37.mismatches}</div>
                                <div class="text-sm text-yellow-600">Missing: ${panel37.missing}</div>
                            </div>
                        </div>
                        <div class="p-2 bg-gray-50 rounded">
                            <div class="text-sm font-semibold text-gray-700">67 Marker Panel</div>
                            <div class="grid grid-cols-3 gap-2 mt-1">
                                <div class="text-sm text-green-600">Match: ${panel67.matches}</div>
                                <div class="text-sm text-red-600">Mismatch: ${panel67.mismatches}</div>
                                <div class="text-sm text-yellow-600">Missing: ${panel67.missing}</div>
                            </div>
                        </div>
                        <div class="p-2 bg-gray-50 rounded">
                            <div class="text-sm font-semibold text-gray-700">111 Marker Panel</div>
                            <div class="grid grid-cols-3 gap-2 mt-1">
                                <div class="text-sm text-green-600">Match: ${panel111.matches}</div>
                                <div class="text-sm text-red-600">Mismatch: ${panel111.mismatches}</div>
                                <div class="text-sm text-yellow-600">Missing: ${panel111.missing}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    comparisonHTML += '</div>';
    results.innerHTML = summary + comparisonHTML;
}


function resetValues() {
    // Clear all input fields
    ['firstSetInputs', 'secondSetInputs'].forEach(containerId => {
        const inputs = document.getElementById(containerId).getElementsByTagName('input');
        Array.from(inputs).forEach(input => {
            input.value = '';
        });
    });

    // Clear paste areas
    document.getElementById('firstSetPaste').value = '';
    document.getElementById('secondSetPaste').value = '';

    // Clear results
    document.getElementById('results').innerHTML = '';
}

function toggleSection(containerId) {
    const container = document.getElementById(containerId);
    const button = document.getElementById(containerId.replace('Container', 'Button'));
    
    container.classList.toggle('expanded');
    button.classList.toggle('expanded');
}

function toggleAllPanels() {
    const containers = ['firstSetContainer', 'secondSetContainer'];
    const allExpanded = containers.every(id => 
        document.getElementById(id).classList.contains('expanded')
    );
    
    containers.forEach(id => {
        const container = document.getElementById(id);
        const button = document.getElementById(id.replace('Container', 'Button'));
        
        if (allExpanded) {
            container.classList.remove('expanded');
            button.classList.remove('expanded');
        } else {
            container.classList.add('expanded');
            button.classList.add('expanded');
        }
    });
}

// Create input fields on page load
createInputFields('firstSetInputs');
createInputFields('secondSetInputs');

// Expand panels by default on page load
document.addEventListener('DOMContentLoaded', function() {
    toggleAllPanels();
});

