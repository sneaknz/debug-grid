(function setupDebugGrid() {
	// DEBUG GRID
	// Customised for NZ Funds site, June 2021
	// Styles for the debug grid are in the helpers.less file

	// Set values for the grid
	const cols = 24
	
	// Some variables for later use
	let debugGridActive = false
	const grid = document.createElement('div')
	grid.classList.add('_debug-grid')

	let gridType = 'full'

	const colContainer = document.createElement('div')
	const colHalf = document.createElement('div')
	const colDivider = document.createElement('div')
	const colTrack = document.createElement('div')

	colContainer.classList.add('_column')
	colHalf.classList.add('_half')
	colDivider.classList.add('_divider')
	colTrack.classList.add('_track')
	
	function generateGridMarkup() {
		grid.innerHTML = ''
		
		if (gridType === 'full') {
			for (let i = 0; i < cols; i++) {
				const column = generateColumn(i === 0)

				grid.appendChild(column)
			}
		} else if (gridType === 'split') {
			const half = Math.floor(cols / 2)
			const halfLeft = colHalf.cloneNode(true)
			const halfRight = colHalf.cloneNode(true)

			for (let i = 0; i < half; i++) {
				const columnLeft = generateColumn(i === 0)
				const columnRight = generateColumn(i === 0)
				halfLeft.appendChild(columnLeft)
				halfRight.appendChild(columnRight)
			}

			grid.appendChild(halfLeft)
			grid.appendChild(halfRight)
		}
	}

	function generateColumn(isFirst) {
		const cloneContainer = colContainer.cloneNode(true)
		const cloneDivider = colDivider.cloneNode(true)
		const cloneTrack = colTrack.cloneNode(true)
		cloneContainer.appendChild(cloneDivider)
		cloneContainer.appendChild(cloneTrack)

		// If this is the first column, add the left border
		if (isFirst) {
			const cloneDividerInitial = colDivider.cloneNode(true)
			cloneDividerInitial.classList.add('_first')
			cloneContainer.appendChild(cloneDividerInitial)
		}

		return cloneContainer
	}

	function showDebugGrid(type) {
		if (gridType !== type) {
			gridType = type
			generateGridMarkup()
		}
		document.body.appendChild(grid)
		grid.classList.add(type)
		debugGridActive = true
	}
	
	function hideDebugGrid(type) {
		document.body.removeChild(grid)
		grid.classList.remove('full')
		grid.classList.remove('split')
		debugGridActive = false
	}
	
	document.addEventListener('keydown', function(zEvent) {
		if (zEvent.ctrlKey && zEvent.altKey && zEvent.shiftKey && zEvent.key === '/') {
			if (debugGridActive) {
				hideDebugGrid()
			} else {
				showDebugGrid('split')
			}
		} else if (zEvent.ctrlKey && zEvent.altKey && zEvent.key === '/') {
			if (debugGridActive) {
				hideDebugGrid()
			} else {
				showDebugGrid('full')
			}
		}
	})
	
	generateGridMarkup()

	// Check for querystring parameter 'grid' or 'gutters'
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const gridParam = urlParams.has('columns')
	
	window.onload = function() { // Don't call before dom is ready
		if (gridParam) {
			showDebugGrid('full')
		}
	}
})()