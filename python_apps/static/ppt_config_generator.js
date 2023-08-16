var jQuery = $.noConflict();
jQuery(document).ready(function($) {
    const slideContainer = $(".slide-container");
    let currentSlideIndex = 0;
    let config = {}; // Configuration object to store user selections

    function showSlide(index) {
        $(".slide-view").hide(); // Hide all slide views
        $(".slide-view").eq(index).show(); // Show the selected slide view
    }

    $(".prev-button").click(function() {
        currentSlideIndex = (currentSlideIndex - 1 + slideContainer.children().length) % slideContainer.children().length;
        showSlide(currentSlideIndex);
    });

    $(".next-button").click(function() {
        currentSlideIndex = (currentSlideIndex + 1) % slideContainer.children().length;
        showSlide(currentSlideIndex);
    });

    function updateSlideIndicators() {
        $(".slide-indicator").text(slideContainer.children().length);
    }
    
    function createSlideView(slideNumber) {
        const slideView = $("<div>").addClass("slide-view");
        const gridSelectionDiv = $("<div>").addClass("grid-selection py-2");
        const slideNumberText = $("<h3>").addClass("text-center").text("Slide " + slideNumber);
        const gridContainer = $("<div>").addClass("grid-container");

        slideView.append(gridSelectionDiv, slideNumberText, gridContainer);

        // Add the slideView to the slideContainer
        slideContainer.append(slideView);
        createGridSystemSelectionForm(slideView);
        updateSlideIndicators();
        return slideView;
    }
    
    $(".add-slide-button").click(function() {
        const slideNumber = slideContainer.children().length + 1;
        const newSlideView = createSlideView(slideNumber);
        showSlide(newSlideView.index());
    });
    
    $(".remove-slide-button").click(function() {
        if (slideContainer.children().length > 1) {
            const removeConfirm = confirm("Are you sure you want to remove the current slide?");
            if (removeConfirm) {
                $(".slide-view:last").remove();
                updateSlideIndicators();
                lastSlideIndex = Math.max(currentSlideIndex, slideContainer.children().length - 1);
                showSlide(lastSlideIndex);
            }
        } else {
            alert("Cannot remove the last slide.");
        }
    });

    function createGridSystemSelectionForm(container) {
        const gridSelectionDiv = $("<div>").addClass("grid-selection py-2");
        const label = $("<label>").attr("for", "grid-system").text("Select Grid System:");
        const select = $("<select>").addClass("grid-system mx-auto");
        select.append(
            $("<option value='1x1'>1x1</option>"),
            $("<option value='2x1'>2x1</option>"),
            $("<option value='2x2' selected>2x2</option>"),
            $("<option value='2x3'>2x3</option>"),
            $("<option value='3x2'>3x2</option>"),
            $("<option value='3x3'>3x3</option>"),
            $("<option value='4x2'>4x2</option>"),
            $("<option value='4x3'>4x3</option>")
        );

        select.change(function() {
            const selectedValue = $(this).val();
            const dimensions = selectedValue.split("x");
            const rows = parseInt(dimensions[1]);
            const cols = parseInt(dimensions[0]);
            const gridContainer = container.find(".grid-container");
            adjustGrid(gridContainer, rows, cols);
        });

        gridSelectionDiv.append(label, select);
        container.find(".grid-selection").remove(); // Remove any existing selection
        container.prepend(gridSelectionDiv);
    }


    function createGridCellForm(gridCell) {
        const form = $("<form>").addClass("content-form p-2 border rounded bg-light");
        const select = $("<select>").addClass("form-select").attr("name", "selection");
    
        select.append(
            $("<option value='blank'>Blank</option>"),
            $("<option value='skip'>Skip</option>"),
            $("<option value='text'>Text</option>"),
            $("<option value='chart'>Chart</option>"),
            $("<option value='image'>Image</option>"),
        );
    
        select.change(function() {
            const selectedValue = $(this).val();
            const formContainer = $(this).closest(".grid-cell");
            const existingDetails = formContainer.find(".form-details");
            existingDetails.remove();
    
            const detailsContainer = $("<div>").addClass("form-details mt-2");
    
            if (selectedValue === "skip") {
                const extendLabel = $("<label>").text("Extend:");
                const extendSelect = $("<select>").addClass("form-select").attr("name", "extend");
                extendSelect.append(
                    $("<option value='left'>From Left</option>"),
                    $("<option value='top'>From Top</option>")
                );
                detailsContainer.append(
                    extendLabel,
                    extendSelect
                );
            } else if (selectedValue === "chart") {
                const chartTypeInput = $("<select>").addClass("form-select mb-1").attr("name", "chartType");
                chartTypeInput.append(
                    $("<option value='line'>Line Chart</option>"),
                    $("<option value='bar'>Bar Chart</option>")
                );
    
                const yAxisColumnsInput = $("<input>").addClass("form-control mb-1").attr("type", "text").attr("name", "yAxisColumns").attr("placeholder", "Y-Axis Columns");
                const xAxisColumnsInput = $("<input>").addClass("form-control mb-1").attr("type", "text").attr("name", "xAxisColumns").attr("placeholder", "X-Axis Columns");
    
                detailsContainer.append(
                    chartTypeInput,
                    yAxisColumnsInput,
                    xAxisColumnsInput
                );
            } else if (selectedValue === "text") {
                const textInput = $("<textarea>").addClass("form-control mb-2").attr("name", "text").attr("placeholder", "Write some text");
    
                const fontSizeInput = $("<select>").addClass("form-select").attr("name", "fontSize");
                for (let i = 6; i <= 32; i++) {
                    fontSizeInput.append($("<option>").val(i).text(i));
                }
    
                const colorInput = $("<input>").addClass("form-control").attr("type", "color").attr("name", "color");
    
                const fontSizeAndColorDiv = $("<div>").addClass("d-flex justify-content-between mb-2").append(
                    fontSizeInput,
                    colorInput
                );
    
                detailsContainer.append(
                    textInput,
                    fontSizeAndColorDiv
                );
            } else if (selectedValue === "image") {
                const imageInput = $("<input>").addClass("form-control mb-2").attr("type", "file").attr("name", "image");
    
                detailsContainer.append(imageInput);
            }
    
            formContainer.append(detailsContainer);
        });
    
        form.append(select);
        return form;
    }
    
    

    function adjustGrid(gridContainer, rows, cols) {
        gridContainer.empty(); // Clear existing grid cells

        const cellWidth = 900 / cols; // Adjust based on total width and columns
        const cellHeight = 500 / rows; // Adjust based on total height and rows

        for (let row = 0; row < rows; row++) {
            const gridRow = $("<div>").addClass("grid-row");
            for (let col = 0; col < cols; col++) {
                const gridCell = $("<div>").addClass("grid-cell");
                gridCell.css({
                    width: cellWidth + "px",
                    height: cellHeight + "px"
                });
                gridRow.append(gridCell);
            }
            gridContainer.append(gridRow);
        }
    }

    $(".slide-view").each(function() {
        const slideView = $(this);
        createGridSystemSelectionForm(slideView);
    });

    
    $(".slide-view").on("mouseenter", ".grid-cell", function() {
        const gridCell = $(this);
        if (!gridCell.hasClass("form-added")) {
            console.log(gridCell);
            const form = createGridCellForm(gridCell);
            gridCell.append(form);
            gridCell.addClass("form-added");
        };
    });
    
    $(".slide-view").on("mouseleave", ".grid-cell", function() {
        const gridCell = $(this);
        gridCell.find(".form-added").remove();
        // Do nothing on hover out
    });

        // Capture and store the configuration
    function captureConfiguration() {
        config = {};

        const slideViews = $(".slide-view");
        slideViews.each(function(index) {
            const slideName = `Slide${index + 1}`;
            const slideConfig = {
                gridSelection: $(this).find(".grid-system").val(),
                grids: {}
            };

            const gridCells = $(this).find(".grid-cell");
            gridCells.each(function(gridIndex) {
                const gridName = `grid${gridIndex + 1}`;
                const gridCellConfig = {
                    selection: $(this).find("select[name='selection']").val(),
                    formDetails: {}
                };

                if (gridCellConfig.selection === "chart") {
                    gridCellConfig.formDetails.type = $(this).find("select[name='chartType']").val();
                    gridCellConfig.formDetails["y-columns"] = $(this).find("input[name='yAxisColumns']").val();
                    gridCellConfig.formDetails["x-columns"] = $(this).find("input[name='xAxisColumns']").val();
                } else if (gridCellConfig.selection === "text") {
                    gridCellConfig.formDetails.text = $(this).find("textarea[name='text']").val();
                    gridCellConfig.formDetails["font-size"] = $(this).find("select[name='fontSize']").val();
                    gridCellConfig.formDetails.color = $(this).find("input[name='color']").val();
                } else if (gridCellConfig.selection === "skip") {
                    gridCellConfig.formDetails.extend = $(this).find("select[name='extend']").val();
                } else if (gridCellConfig.selection === "image") {
                    // Add code to capture image details
                }

                slideConfig.grids[gridName] = gridCellConfig;
            });

            config[slideName] = slideConfig;
        });
    }

    // Capture and store the configuration
    function captureConfiguration() {
        config = {};

        const slideViews = $(".slide-view");
        slideViews.each(function(index) {
            const slideName = `Slide${index + 1}`;
            const slideConfig = {
                gridSelection: $(this).find(".grid-system").val(),
                grids: {}
            };

            const gridCells = $(this).find(".grid-cell");
            gridCells.each(function(gridIndex) {
                const gridName = `grid${gridIndex + 1}`;
                const gridCellConfig = {
                    selection: $(this).find("select[name='selection']").val(),
                    formDetails: {}
                };

                if (gridCellConfig.selection === "chart") {
                    gridCellConfig.formDetails.type = $(this).find("select[name='chartType']").val();
                    gridCellConfig.formDetails["y-columns"] = $(this).find("input[name='yAxisColumns']").val();
                    gridCellConfig.formDetails["x-columns"] = $(this).find("input[name='xAxisColumns']").val();
                } else if (gridCellConfig.selection === "text") {
                    gridCellConfig.formDetails.text = $(this).find("textarea[name='text']").val();
                    gridCellConfig.formDetails["font-size"] = $(this).find("select[name='fontSize']").val();
                    gridCellConfig.formDetails.color = $(this).find("input[name='color']").val();
                } else if (gridCellConfig.selection === "skip") {
                    gridCellConfig.formDetails.extend = $(this).find("select[name='extend']").val();
                } else if (gridCellConfig.selection === "image") {
                    // Add code to capture image details
                }

                slideConfig.grids[gridName] = gridCellConfig;
            });

            config[slideName] = slideConfig;
        });
    }

    $(".create-config-button").click(function() {
        captureConfiguration();
        const configFileName = prompt("Enter the configuration file name:");
        if (configFileName) {
            const jsonString = JSON.stringify(config, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${configFileName}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    });
    

    showSlide(currentSlideIndex);
});
