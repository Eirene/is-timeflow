"use client";

import { FolderIcon, TrashIcon } from "@heroicons/react/24/outline";

import Input from "../components/ui/Input";
import ListContainer from "../components/ui/ListContainer";
import ListItem from "../components/ui/ListItem";
import { Button } from "../components/ui/Button";
import { ButtonIcon } from "../components/ui/ButtonIcon";

export default function Projects() {
    const handleSaveClick = () => {
        console.log("Button Save clicked");
    };

    const handleDeleteClick = (projectName: string) => {
        console.log(`Delete clicked for: ${projectName}`);
    };

    return (
        <div className="space-y-6 lg:space-y-10">
            <form className="space-y-5">
                <Input />
                <div className="text-right">
                    <Button onClick={handleSaveClick}>Save</Button>
                </div>
            </form>

            <ListContainer>
                <ListItem>
                    <FolderIcon className="text-gray-400 size-5" />
                    <span className="flex-1 text-gray-700 dark:text-gray-300 tracking-wide">
                        My Project Vue
                    </span>
                    <ButtonIcon
                        onClick={() => handleDeleteClick("My Project Vue")}
                    >
                        <TrashIcon className="size-5" />
                    </ButtonIcon>
                </ListItem>
                <ListItem>
                    <FolderIcon className="text-gray-400 size-5" />
                    <span className="flex-1 text-gray-700 dark:text-gray-300 tracking-wide">
                        My Project React
                    </span>
                    <ButtonIcon
                        onClick={() => handleDeleteClick("My Project React")}
                    >
                        <TrashIcon className="size-5" />
                    </ButtonIcon>
                </ListItem>
            </ListContainer>
        </div>
    );
}
