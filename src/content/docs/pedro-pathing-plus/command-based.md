---
title: Command-Based Programming
description: Learn how to use PedroPathingPlus with the Command-Based paradigm.
---

PedroPathingPlus includes built-in support for Command-Based programming, allowing you to structure your robot code efficiently using commands and subsystems. This approach is similar to WPILib and FTCLib but tailored for the Pedro Pathing library.

## Introduction

In Command-Based programming:
- **Subsystems** represent physical parts of the robot (e.g., Drivetrain, Arm).
- **Commands** represent actions or sequences of actions (e.g., FollowPath, MoveArm).
- **CommandScheduler** manages the execution of commands and their requirements.

## Key Classes

The `com.pedropathingplus.command` package provides several key classes:
- `Command`: The base interface for all commands.
- `Subsystem`: The base interface for all subsystems.
- `CommandScheduler`: The singleton that schedules and runs commands.
- `FollowPathCommand`: A specialized command for following paths.

## Using FollowPathCommand

The `FollowPathCommand` allows you to execute path following as a command. It requires a `Follower` subsystem.

### 1. Pre-built PathChain

If you have already built a `PathChain` (e.g., loaded from a file or constructed manually), you can pass it directly to the command.

```java
// Assuming 'follower' is your Follower instance and 'myPathChain' is a PathChain object
new FollowPathCommand(follower, myPathChain);
```

You can also specify whether to hold the end position and the maximum power:

```java
new FollowPathCommand(follower, myPathChain, true, 0.8)
    .setHoldEnd(false) // Chainable configuration
    .setMaxPower(0.5);
```

### 2. Fluent Builder

You can build paths directly within the command using a fluent API. This is great for quick sequences or dynamic paths.

```java
new FollowPathCommand(follower)
    .curveThrough(0.5, new Pose(10, 10, 0), new Pose(20, 20, Math.toRadians(90)))
    .setConstantHeadingInterpolation(Math.toRadians(90))
    .addTemporalCallback(1.0, () -> {
        // Run code 1 second into the path
        telemetry.addData("Status", "Path Started");
    });
```

## Creating a Subsystem

To use `FollowPathCommand` effectively, you should wrap the `Follower` in a `Subsystem`. This ensures that only one command controls the drivetrain at a time.

```java
package org.firstinspires.ftc.teamcode.subsystems;

import com.pedropathing.follower.Follower;
import com.pedropathingplus.command.Subsystem;
import com.pedropathingplus.command.Command;
import com.pedropathingplus.command.RunCommand;
import com.qualcomm.robotcore.hardware.HardwareMap;

public class MecanumDrive implements Subsystem {
    private final Follower follower;

    public MecanumDrive(HardwareMap hardwareMap) {
        follower = new Follower(hardwareMap);
        register(); // Register this subsystem with the Scheduler
    }

    @Override
    public void periodic() {
        // Update the follower every loop
        follower.update();
    }

    public Follower getFollower() {
        return follower;
    }

    public void setDefaultDrive() {
        // Example default command: TeleOp driving
        setDefaultCommand(new RunCommand(() -> {
            follower.setTeleOpMovementVectors(
                -gamepad1.left_stick_y,
                -gamepad1.left_stick_x,
                -gamepad1.right_stick_x
            );
        }, this));
    }
}
```

## Example OpMode

Since PedroPathingPlus does not provide a base `CommandOpMode`, you must manage the `CommandScheduler` yourself in a `LinearOpMode`.

```java
package org.firstinspires.ftc.teamcode.opmodes;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.pedropathingplus.command.CommandScheduler;
import com.pedropathingplus.command.FollowPathCommand;
import com.pedropathing.geometry.Pose;
import org.firstinspires.ftc.teamcode.subsystems.MecanumDrive;

@Autonomous(name = "Command Auto Example")
public class CommandAutoExample extends LinearOpMode {

    @Override
    public void runOpMode() {
        // Initialize Subsystems
        MecanumDrive drive = new MecanumDrive(hardwareMap);

        // Schedule Commands
        CommandScheduler.getInstance().schedule(
            new FollowPathCommand(drive.getFollower())
                .curveThrough(0.5, new Pose(10, 0), new Pose(20, 10))
                .setConstantHeadingInterpolation(0)
        );

        waitForStart();

        // Run the Scheduler Loop
        while (opModeIsActive()) {
            CommandScheduler.getInstance().run();

            // Optional: Add telemetry
            telemetry.update();
        }

        // Reset the Scheduler when done
        CommandScheduler.getInstance().reset();
    }
}
```

## Advanced Features

### Sequential & Parallel Groups

You can combine commands using `SequentialCommandGroup` and `ParallelCommandGroup`.

```java
new SequentialCommandGroup(
    new FollowPathCommand(drive.getFollower()).curveThrough(...),
    new ParallelCommandGroup(
        new MoveArmCommand(arm),
        new FollowPathCommand(drive.getFollower()).curveThrough(...)
    )
);
```

### Triggers and Bindings

You can bind commands to gamepad buttons or other triggers (if using a helper library or custom implementation), or simply schedule them conditionally in your `periodic()` or main loop.
