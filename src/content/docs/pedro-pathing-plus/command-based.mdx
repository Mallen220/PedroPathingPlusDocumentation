---
title: Command-Based Programming
description: Learn how to use PedroPathingPlus with the Command-Based paradigm.
---

PedroPathingPlus includes built-in support for Command-Based programming, allowing you to structure your robot code efficiently using commands and subsystems. This approach is similar to WPILib and FTCLib but tailored for the Pedro Pathing library.

## Introduction

In Command-Based programming:
- **Subsystems** represent physical parts of the robot (e.g., Drivetrain, Arm). They encapsulate hardware and logic.
- **Commands** represent actions or sequences of actions (e.g., FollowPath, MoveArm). They define what the robot does.
- **CommandScheduler** manages the execution of commands and their requirements. It ensures that conflicting commands don't run simultaneously.

## Key Classes

The `com.pedropathingplus.command` package provides several key classes:

- **`Command`**: The base interface for all commands. It defines methods for initialization, execution, and finishing.
- **`Subsystem`**: The base interface for all subsystems. Subsystems register themselves with the scheduler and can have default commands.
- **`CommandScheduler`**: The singleton that schedules and runs commands.
- **`FollowPathCommand`**: A specialized command for following paths.

## Standard Commands

PedroPathingPlus provides several standard commands to simplify common tasks:

### InstantCommand
Runs a `Runnable` once and finishes immediately. Useful for setting servo positions or toggling states.

```java
new InstantCommand(() -> intake.setPower(1.0));
```

### WaitCommand
Waits for a specified duration in milliseconds.

```java
new WaitCommand(1000); // Wait for 1 second
```

### WaitUntilCommand
Waits until a specific condition (a `BooleanSupplier`) becomes true.

```java
new WaitUntilCommand(() -> sensor.getDistance() < 10);
```

### RunCommand
Runs a `Runnable` repeatedly. This is often used as a default command for a subsystem (e.g., driving with joysticks).

```java
new RunCommand(() -> drive.teleOp(gamepad1));
```

## Command Groups

You can combine commands into groups to create complex sequences.

### SequentialCommandGroup
Runs a list of commands one after another.

```java
new SequentialCommandGroup(
    new FollowPathCommand(drive, path1),
    new WaitCommand(500),
    new FollowPathCommand(drive, path2)
);
```

### ParallelCommandGroup
Runs a set of commands simultaneously. The group finishes when **all** commands have finished.

```java
new ParallelCommandGroup(
    new FollowPathCommand(drive, path),
    new RunCommand(() -> arm.moveToPosition(100))
);
```

### ParallelRaceGroup
Runs a set of commands simultaneously. The group finishes as soon as **any one** command finishes. This is useful for timeouts or "race" conditions.

```java
new ParallelRaceGroup(
    new WaitCommand(3000), // Timeout after 3 seconds
    new RunCommand(() -> intake.run()) // Run intake until timeout
);
```

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
import com.pedropathingplus.command.SequentialCommandGroup;
import com.pedropathingplus.command.ParallelCommandGroup;
import com.pedropathingplus.command.WaitCommand;
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
            new SequentialCommandGroup(
                // Drive to first position
                new FollowPathCommand(drive.getFollower())
                    .curveThrough(0.5, new Pose(10, 0), new Pose(20, 10))
                    .setConstantHeadingInterpolation(0),

                // Wait for a moment
                new WaitCommand(500),

                // Drive back
                new FollowPathCommand(drive.getFollower())
                    .curveThrough(0.5, new Pose(10, 0), new Pose(0, 0))
                    .setConstantHeadingInterpolation(0)
            )
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
