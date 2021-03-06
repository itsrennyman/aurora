import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { WebsitesForm } from "../../components/WebsitesForm";
import {
  Wrapper,
  WrapperActions,
  WrapperContent,
  WrapperHeader,
  WrapperTitle,
} from "../../components/Wrapper";
import { client } from "../../lib/client";
import { useWebsite } from "../../lib/hooks/use-website";

export function EditWebsite() {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useWebsite(id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleSubmit = async (data) => {
    await client
      .put(`/websites/${id}`, data)
      .then(() => {
        toast({ status: "success", title: "Website updated." });
      })
      .catch(() => {
        toast({ status: "error", title: "An error has occurred.." });
      });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    client
      .delete(`/websites/${id}`)
      .then(() => {
        navigate("/");
        toast({ status: "success", title: "Website deleted." });
      })
      .catch(() => {
        setIsDeleting(false);
        toast({ status: "error", title: "An error has occurred.." });
      });
  };

  return (
    <Wrapper>
      <WrapperHeader>
        <WrapperTitle>Website Details</WrapperTitle>
        <WrapperActions>
          <Button as={Link} to="/">
            Back to Websites
          </Button>

          <Button colorScheme="red" onClick={onOpen}>
            Delete Website
          </Button>
        </WrapperActions>
      </WrapperHeader>

      <WrapperContent>
        {isLoading && <Loader />}
        {isError && <div>Something went wrong ...</div>}
        {!isLoading && !isError && (
          <WebsitesForm isNew={false} values={data} onSubmit={handleSubmit} />
        )}
      </WrapperContent>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Website
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isLoading={isDeleting}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Wrapper>
  );
}
