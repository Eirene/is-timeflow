import { FolderIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ListContainer from "../components/ui/ListContainer";
import ListItem from "../components/ui/ListItem";
import ButtonIcon from "../components/ui/ButtonIcon";

export default function Projects() {
    return (
        <div className="space-y-6 lg:space-y-10">
            <form className="space-y-5">
                <Input />
                <div className="text-right">
                    <Button>Save</Button>
                </div>
            </form>

            <ListContainer>
                <ListItem>
                    <FolderIcon className="text-gray-400 size-5" />
                    <span className="flex-1 text-gray-700 dark:text-gray-300 tracking-wide">
                        My Project Vue
                    </span>
                    <ButtonIcon>
                        <TrashIcon className="size-5" />
                    </ButtonIcon>
                </ListItem>
                <ListItem>
                    <FolderIcon className="text-gray-400 size-5" />
                    <span className="flex-1 text-gray-700 dark:text-gray-300 tracking-wide">
                        My Project React
                    </span>
                    <ButtonIcon>
                        <TrashIcon className="size-5" />
                    </ButtonIcon>
                </ListItem>
            </ListContainer>
        </div>
    );
}
