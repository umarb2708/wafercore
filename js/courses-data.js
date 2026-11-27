/* Course catalog sourced from the WaferCore course list. Prices are INR. */
window.WAFERCORE_COURSES = [
    {
        id: "systemverilog-rtl",
        track: "vlsi",
        category: "VLSI Design",
        name: "SystemVerilog Programming & RTL Design",
        summary: "Comprehensive training on SystemVerilog language for hardware design. Covers data types, procedural blocks, interfaces, assertions, FSM design, RTL coding guidelines, synthesis concepts, and industry-standard coding practices used in ASIC and FPGA development. Students will design and simulate real digital circuits.",
        price: 35000
    },
    {
        id: "uvm",
        track: "vlsi",
        category: "VLSI Verification",
        name: "Universal Verification Methodology (UVM)",
        summary: "Industry-standard verification methodology used in semiconductor companies. Covers UVM architecture, components, sequences, drivers, monitors, scoreboards, agents, environments, factory mechanism, register abstraction layer (RAL), and complete verification environment development for ASIC verification projects.",
        price: 45000
    },
    {
        id: "sva-coverage",
        track: "vlsi",
        category: "VLSI Verification",
        name: "SystemVerilog Assertions (SVA) & Functional Coverage",
        summary: "Focused course on assertion-based verification. Students learn temporal operators, concurrent assertions, functional coverage, coverage-driven verification techniques, and bug-detection methodologies widely used in verification teams.",
        price: 15000
    },
    {
        id: "fpga-design",
        track: "vlsi",
        category: "VLSI Design",
        name: "FPGA Design using Verilog/SystemVerilog",
        summary: "Teaches FPGA architecture, RTL design, synthesis, timing constraints, implementation flow, and hardware validation using Intel FPGA or Xilinx Vivado platforms. Students implement real-time hardware projects.",
        price: 25000
    },
    {
        id: "asic-physical-design",
        track: "vlsi",
        category: "VLSI Physical Design",
        name: "ASIC Physical Design Flow",
        summary: "Covers complete backend design flow including floorplanning, placement, CTS, routing, STA, power analysis, DRC, LVS, and sign-off methodologies using industry-standard EDA concepts.",
        price: 20000
    },
    {
        id: "static-timing-analysis",
        track: "vlsi",
        category: "VLSI Physical Design",
        name: "Static Timing Analysis (STA)",
        summary: "Detailed study of setup/hold analysis, clock domains, timing closure, constraints generation, timing exceptions, and sign-off analysis used in modern ASIC development.",
        price: 15000
    },
    {
        id: "design-for-testability",
        track: "vlsi",
        category: "VLSI DFT",
        name: "Design for Testability (DFT)",
        summary: "Covers scan insertion, ATPG, boundary scan, BIST, JTAG, fault simulation, test coverage analysis, and silicon validation methodologies followed in semiconductor manufacturing.",
        price: 10000
    },
    {
        id: "formal-cdc",
        track: "vlsi",
        category: "VLSI Verification",
        name: "Formal Verification & CDC/RDC Analysis",
        summary: "Introduces formal verification techniques, property checking, clock-domain crossing verification, reset-domain crossing analysis, and advanced sign-off checks used in modern SoC projects.",
        price: 30000
    },
    {
        id: "riscv-processor",
        track: "vlsi",
        category: "VLSI Design",
        name: "RISC-V Processor Design",
        summary: "Students develop a RISC-V processor core from specification to implementation. Covers instruction architecture, pipeline design, memory interfaces, interrupts, and verification methodologies.",
        price: 50000
    },
    {
        id: "soc-amba",
        track: "vlsi",
        category: "VLSI Design",
        name: "SoC Architecture & AMBA Protocols",
        summary: "Covers AHB, APB, AXI, ACE protocols, memory subsystems, cache architecture, interconnect design, and modern System-on-Chip integration concepts.",
        price: 5000
    },
    {
        id: "embedded-c",
        track: "embedded",
        category: "Embedded Systems",
        name: "Embedded C Programming",
        summary: "Industry-focused programming course covering pointers, structures, memory management, interrupts, bit manipulation, and embedded coding standards such as MISRA-C.",
        price: 10000
    },
    {
        id: "arm-cortex-m",
        track: "embedded",
        category: "Embedded Systems",
        name: "ARM Cortex-M Microcontroller Programming",
        summary: "Hands-on training using STM32, NXP, or TI microcontrollers. Covers GPIO, UART, SPI, I2C, ADC, PWM, interrupts, DMA, timers, and peripheral interfacing.",
        price: 15000
    },
    {
        id: "embedded-linux",
        track: "embedded",
        category: "Embedded Systems",
        name: "Embedded Linux Development",
        summary: "Covers Linux kernel basics, bootloader concepts, device drivers, file systems, shell scripting, Buildroot, Yocto, and application development for embedded platforms.",
        price: 20000
    },
    {
        id: "rtos",
        track: "embedded",
        category: "Embedded Systems",
        name: "Real-Time Operating Systems (RTOS)",
        summary: "Training on FreeRTOS and RTOS concepts including tasks, scheduling, semaphores, queues, mutexes, inter-task communication, and real-time constraints.",
        price: 25000
    },
    {
        id: "iot-system-design",
        track: "embedded",
        category: "Embedded Systems",
        name: "IoT System Design",
        summary: "Covers sensor interfacing, wireless communication, MQTT, cloud integration, ESP32, Raspberry Pi, edge computing, and industrial IoT applications.",
        price: 30000
    },
    {
        id: "automotive-embedded",
        track: "embedded",
        category: "Embedded Systems",
        name: "Automotive Embedded Systems",
        summary: "Introduces CAN, LIN, FlexRay, AUTOSAR, UDS diagnostics, functional safety basics, and ECU software development used in automotive electronics.",
        price: 35000
    },
    {
        id: "device-drivers",
        track: "embedded",
        category: "Embedded Systems",
        name: "Device Driver Development",
        summary: "Linux driver programming including character drivers, platform drivers, device tree concepts, kernel modules, and hardware-software interaction.",
        price: 40000
    },
    {
        id: "advanced-firmware",
        track: "embedded",
        category: "Embedded Systems",
        name: "Advanced Firmware Development",
        summary: "Covers bootloaders, memory optimization, debugging techniques, communication stacks, firmware architecture, and production-grade embedded software practices.",
        price: 50000
    },
    {
        id: "edge-ai",
        track: "embedded",
        category: "Embedded Systems",
        name: "Edge AI for Embedded Systems",
        summary: "Introduction to TinyML, TensorFlow Lite Micro, neural network deployment on microcontrollers, sensor analytics, and AI-enabled edge devices.",
        price: 55000
    },
    {
        id: "raspberry-pi-python",
        track: "embedded",
        category: "Embedded Systems",
        name: "Raspberry Pi & Embedded Python",
        summary: "Practical course on Linux-based embedded development using Python, GPIO control, camera interfaces, networking, and automation projects.",
        price: 60000
    },
    {
        id: "robotics-microcontrollers",
        track: "robotics",
        category: "Robotics",
        name: "Robotics using Microcontrollers",
        summary: "Covers robot architecture, sensors, actuators, motor drivers, Arduino/STM32 programming, PID control, line follower robots, obstacle avoidance robots, and autonomous navigation fundamentals.",
        price: 20000
    },
    {
        id: "autonomous-mobile-robots",
        track: "robotics",
        category: "Robotics",
        name: "Autonomous Mobile Robot Design",
        summary: "Students build intelligent robots using embedded controllers, ultrasonic sensors, encoders, IMU sensors, path planning algorithms, and wireless communication modules.",
        price: 25000
    },
    {
        id: "ros",
        track: "robotics",
        category: "Robotics",
        name: "ROS (Robot Operating System)",
        summary: "Industry-standard robotics framework covering ROS nodes, topics, services, simulations, navigation stack, robot perception, and autonomous robot software design.",
        price: 30000
    },
    {
        id: "plc-automation",
        track: "robotics",
        category: "Robotics",
        name: "Industrial Automation & PLC Programming",
        summary: "Covers PLC architecture, ladder logic, SCADA, sensors, actuators, industrial communication protocols, and Industry 4.0 automation systems.",
        price: 35000
    },
    {
        id: "ai-computer-vision",
        track: "robotics",
        category: "Robotics & AI",
        name: "AI & Computer Vision for Robotics",
        summary: "Integrates OpenCV, machine learning, object detection, SLAM concepts, and intelligent robotics applications used in manufacturing and autonomous vehicles.",
        price: 40000
    }
];

window.WAFERCORE_TRACKS = [
    {
        id: "vlsi",
        href: "courses/vlsi-design.html",
        title: "VLSI Design",
        icon: "fa-microchip",
        summary: "RTL, verification, physical design, and DFT programs for ASIC and FPGA engineers."
    },
    {
        id: "embedded",
        href: "courses/embedded-systems.html",
        title: "Embedded Systems",
        icon: "fa-cogs",
        summary: "Firmware, microcontrollers, Linux, RTOS, IoT, and automotive embedded training."
    },
    {
        id: "robotics",
        href: "courses/robotics.html",
        title: "Robotics",
        icon: "fa-robot",
        summary: "Mobile robots, ROS, industrial automation, and computer vision for robotics."
    }
];
